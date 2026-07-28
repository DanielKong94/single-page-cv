import { streamText, convertToModelMessages } from 'ai';
import type { UIMessage } from 'ai';
import { verifyTurnstile } from '@/lib/security/turnstile';
import { checkRateLimit } from '@/lib/security/ratelimit';
import { retrieve } from '@/lib/rag/retrieve';
import { buildSystemPrompt } from '@/lib/chat/prompt';
import { chatModel, MAX_OUTPUT_TOKENS } from '@/lib/chat/provider';

export const maxDuration = 30;

const MAX_MESSAGE_LENGTH = 500;

interface ChatRequestBody {
  messages: UIMessage[];
  turnstileToken: string;
}

function textOf(message: UIMessage): string {
  return message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join(' ');
}

function clientIp(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
}

export async function POST(request: Request) {
  const { messages, turnstileToken } = (await request.json()) as ChatRequestBody;
  const ip = clientIp(request);

  // Order matters: cheapest and most decisive gates first, so an abusive
  // request is rejected before it costs an embedding call or a token.
  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return Response.json({ error: 'Verification failed. Please try again.' }, { status: 403 });
  }

  const latest = messages.at(-1);
  if (!latest || latest.role !== 'user') {
    return Response.json({ error: 'No question provided.' }, { status: 400 });
  }

  const question = textOf(latest);
  if (question.length === 0 || question.length > MAX_MESSAGE_LENGTH) {
    return Response.json(
      { error: `Questions must be between 1 and ${MAX_MESSAGE_LENGTH} characters.` },
      { status: 400 }
    );
  }

  const limit = await checkRateLimit(ip);
  if (!limit.allowed) {
    return Response.json(
      {
        error:
          limit.reason === 'global'
            ? "The assistant is resting for today — email Daniel directly at danielkong.w@gmail.com."
            : "You've asked a lot of questions — try again in an hour, or email danielkong.w@gmail.com.",
      },
      { status: 429 }
    );
  }

  const chunks = await retrieve(question);

  const result = streamText({
    model: chatModel,
    system: buildSystemPrompt(chunks),
    // Async as of AI SDK v7 — awaiting is required, and a mocked streamText
    // will happily accept the un-awaited Promise, so only tsc catches this.
    messages: await convertToModelMessages(messages),
    maxOutputTokens: MAX_OUTPUT_TOKENS,
  });

  return result.toUIMessageStreamResponse();
}
