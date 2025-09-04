'use server';
/**
 * @fileOverview Adjusts the difficulty of the daily challenge based on the user's past performance.
 *
 * - adjustDifficultyBasedOnPerformance - A function that adjusts the difficulty.
 * - AdjustDifficultyBasedOnPerformanceInput - The input type for the adjustDifficultyBasedOnPerformance function.
 * - AdjustDifficultyBasedOnPerformanceOutput - The return type for the adjustDifficultyBasedOnPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustDifficultyBasedOnPerformanceInputSchema = z.object({
  pastPerformance: z
    .array(z.number())
    .describe("An array of the user's past performance scores."),
  currentDifficulty: z
    .string()
    .describe('The current difficulty level of the game.'),
});
export type AdjustDifficultyBasedOnPerformanceInput = z.infer<
  typeof AdjustDifficultyBasedOnPerformanceInputSchema
>;

const AdjustDifficultyBasedOnPerformanceOutputSchema = z.object({
  adjustedDifficulty: z
    .string()
    .describe('The adjusted difficulty level of the game.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the difficulty adjustment.'),
});
export type AdjustDifficultyBasedOnPerformanceOutput = z.infer<
  typeof AdjustDifficultyBasedOnPerformanceOutputSchema
>;

export async function adjustDifficultyBasedOnPerformance(
  input: AdjustDifficultyBasedOnPerformanceInput
): Promise<AdjustDifficultyBasedOnPerformanceOutput> {
  return adjustDifficultyBasedOnPerformanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adjustDifficultyBasedOnPerformancePrompt',
  input: {
    schema: AdjustDifficultyBasedOnPerformanceInputSchema,
  },
  output: {
    schema: AdjustDifficultyBasedOnPerformanceOutputSchema,
  },
  prompt: `You are an AI game difficulty adjuster. Given the player's past
performance (an array of numerical scores) and the current difficulty level,
determine whether to increase, decrease, or maintain the difficulty for the
next game. Explain your reasoning. Available difficulty levels are Easy,
Medium, and Hard.

Past Performance: {{{pastPerformance}}}
Current Difficulty: {{{currentDifficulty}}}

Output:
Adjusted Difficulty: 
Reasoning: `,
});

const adjustDifficultyBasedOnPerformanceFlow = ai.defineFlow(
  {
    name: 'adjustDifficultyBasedOnPerformanceFlow',
    inputSchema: AdjustDifficultyBasedOnPerformanceInputSchema,
    outputSchema: AdjustDifficultyBasedOnPerformanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
