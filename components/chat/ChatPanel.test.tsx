import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const sendMessage = vi.fn();
const chatState = {
  messages: [] as unknown[],
  status: 'ready' as string,
  error: undefined as Error | undefined,
};

vi.mock('@ai-sdk/react', () => ({
  useChat: () => ({ ...chatState, sendMessage }),
}));

// Fires onSuccess on mount when tokenOnMount is true, so the enabled send path
// is reachable. A static stub would leave the token empty forever and every
// assertion below about sending would be vacuous.
let tokenOnMount = true;
vi.mock('@marsidev/react-turnstile', () => ({
  Turnstile: ({ onSuccess }: { onSuccess: (t: string) => void }) => {
    if (tokenOnMount) onSuccess('test-token');
    return <div data-testid="turnstile" />;
  },
}));

import ChatPanel from './ChatPanel';

describe('ChatPanel', () => {
  beforeEach(() => {
    sendMessage.mockReset();
    chatState.messages = [];
    chatState.status = 'ready';
    chatState.error = undefined;
    tokenOnMount = true;
  });

  it('shows suggested questions when the conversation is empty', () => {
    render(<ChatPanel onClose={() => {}} />);
    expect(screen.getByText(/AWS/i)).toBeInTheDocument();
  });

  it('renders the Turnstile widget', () => {
    render(<ChatPanel onClose={() => {}} />);
    expect(screen.getByTestId('turnstile')).toBeInTheDocument();
  });

  it('disables the send button until a Turnstile token arrives', () => {
    tokenOnMount = false;
    render(<ChatPanel onClose={() => {}} />);
    expect(screen.getByRole('button', { name: /send/i })).toBeDisabled();
  });

  it('labels the close control for screen readers', () => {
    render(<ChatPanel onClose={() => {}} />);
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('calls onClose when the close control is activated', async () => {
    const onClose = vi.fn();
    render(<ChatPanel onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  // Security-critical: the token must ride along on every send. Without this
  // assertion, a regression dropping it would make the API reject every request
  // with 403 and the rest of this suite would still be green.
  it('sends the typed question with the Turnstile token in the request body', async () => {
    render(<ChatPanel onClose={() => {}} />);
    await userEvent.type(screen.getByLabelText(/your question/i), 'What AWS experience?');
    await userEvent.click(screen.getByRole('button', { name: /send/i }));

    expect(sendMessage).toHaveBeenCalledWith(
      { text: 'What AWS experience?' },
      { body: { turnstileToken: 'test-token' } }
    );
  });

  it('sends a suggested question when one is clicked', async () => {
    render(<ChatPanel onClose={() => {}} />);
    await userEvent.click(screen.getByText(/AWS/i));
    expect(sendMessage).toHaveBeenCalledWith(
      { text: "What's Daniel's experience with AWS?" },
      { body: { turnstileToken: 'test-token' } }
    );
  });

  it('does not send an empty or whitespace-only question', async () => {
    render(<ChatPanel onClose={() => {}} />);
    await userEvent.type(screen.getByLabelText(/your question/i), '   ');
    await userEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it('caps input length at the 500 characters the API enforces', () => {
    render(<ChatPanel onClose={() => {}} />);
    expect(screen.getByLabelText(/your question/i)).toHaveAttribute('maxLength', '500');
  });

  it('blocks sending while a response is streaming', async () => {
    chatState.status = 'streaming';
    render(<ChatPanel onClose={() => {}} />);
    expect(screen.getByRole('button', { name: /send/i })).toBeDisabled();
  });

  it('surfaces an error with the email fallback rather than failing silently', () => {
    chatState.error = new Error('boom');
    render(<ChatPanel onClose={() => {}} />);
    expect(screen.getByText(/danielkong\.w@gmail\.com/)).toBeInTheDocument();
  });

  it('renders conversation messages instead of suggestions once a chat starts', () => {
    chatState.messages = [
      { id: '1', role: 'user', parts: [{ type: 'text', text: 'Hi' }] },
      { id: '2', role: 'assistant', parts: [{ type: 'text', text: 'Hello there' }] },
    ];
    render(<ChatPanel onClose={() => {}} />);
    expect(screen.getByText('Hello there')).toBeInTheDocument();
    expect(screen.queryByText(/Try asking:/)).not.toBeInTheDocument();
  });
});
