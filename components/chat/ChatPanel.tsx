'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { Turnstile } from '@marsidev/react-turnstile';
import { X, Send } from 'lucide-react';
import Message from './Message';

const SUGGESTIONS = [
  "What's Daniel's experience with AWS?",
  'Tell me about his leadership roles.',
  'What has he built with Laravel?',
];

export default function ChatPanel({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const { messages, sendMessage, status, error } = useChat();

  const busy = status === 'submitted' || status === 'streaming';
  const canSend = turnstileToken !== '' && !busy;

  function submit(text: string) {
    if (!canSend || text.trim() === '') return;
    sendMessage({ text }, { body: { turnstileToken } });
    setInput('');
  }

  return (
    <div
      role="dialog"
      aria-label="Chat with Daniel's assistant"
      className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-gray-900 sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[32rem] sm:w-96 sm:rounded-xl sm:shadow-2xl"
    >
      <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Ask about Daniel</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">AI assistant · answers from his CV</p>
        </div>
        <button onClick={onClose} aria-label="Close chat" className="text-gray-500 hover:text-gray-800 dark:hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">Try asking:</p>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => submit(s)}
                disabled={!canSend}
                className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-left text-sm text-gray-700 hover:border-blue-500 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300"
              >
                {s}
              </button>
            ))}
          </div>
        ) : (
          messages.map((m) => <Message key={m.id} message={m} />)
        )}

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">
            Something went wrong. Email Daniel at danielkong.w@gmail.com.
          </p>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
        className="border-t border-gray-200 p-3 dark:border-gray-700"
      >
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''}
          onSuccess={setTurnstileToken}
          options={{ size: 'invisible' }}
        />
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={500}
            placeholder="Ask about his experience..."
            aria-label="Your question"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            disabled={!canSend}
            aria-label="Send message"
            className="rounded-lg bg-blue-600 px-3 py-2 text-white disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
