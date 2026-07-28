import { openai } from '@ai-sdk/openai';
import type { LanguageModel } from 'ai';

/**
 * THE PROVIDER SWAP POINT.
 *
 * Nothing else in the codebase imports a provider SDK. To move to Claude:
 *
 *   npm install @ai-sdk/anthropic
 *   import { anthropic } from '@ai-sdk/anthropic';
 *   export const chatModel: LanguageModel = anthropic('claude-haiku-4-5');
 *
 * No route handler, prompt builder or component changes.
 */
export const chatModel: LanguageModel = openai('gpt-4o-mini');

/** Caps spend per answer. Rule 4 asks for 2-4 sentences; this is the hard stop. */
export const MAX_OUTPUT_TOKENS = 400;
