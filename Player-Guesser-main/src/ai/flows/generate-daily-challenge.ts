'use server';

/**
 * @fileOverview Flow to generate a daily player challenge using a seed.
 *
 * - generateDailyChallenge - A function that generates a daily challenge.
 * - GenerateDailyChallengeInput - The input type for the generateDailyChallenge function.
 * - GenerateDailyChallengeOutput - The return type for the generateDailyChallenge function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDailyChallengeInputSchema = z.object({
  seed: z.number().describe('The seed for generating the daily challenge.'),
  userPerformance: z.number().describe('A number representing the user past performance, used to adjust the challenge difficulty.'),
});
export type GenerateDailyChallengeInput = z.infer<typeof GenerateDailyChallengeInputSchema>;

const GenerateDailyChallengeOutputSchema = z.object({
  playerName: z.string().describe('The name of the player for the daily challenge.'),
  clubHistory: z.array(z.string()).describe('The list of clubs the player has played for.'),
  challengeDifficulty: z.string().describe('The difficulty of the challenge, adjusted based on user performance.'),
});
export type GenerateDailyChallengeOutput = z.infer<typeof GenerateDailyChallengeOutputSchema>;

export async function generateDailyChallenge(input: GenerateDailyChallengeInput): Promise<GenerateDailyChallengeOutput> {
  return generateDailyChallengeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDailyChallengePrompt',
  input: {schema: GenerateDailyChallengeInputSchema},
  output: {schema: GenerateDailyChallengeOutputSchema},
  prompt: `You are an AI that generates a daily player challenge based on a seed and the user's performance.

Given the seed: {{seed}} and user performance: {{userPerformance}}, generate a player name, their club history, and the challenge difficulty.

The challenge difficulty should be adjusted based on userPerformance - if it is low, then the player should be relatively well known, and if it is high then the player should be obscure.

Ensure the player name and club history are realistic.
`,
});

const generateDailyChallengeFlow = ai.defineFlow(
  {
    name: 'generateDailyChallengeFlow',
    inputSchema: GenerateDailyChallengeInputSchema,
    outputSchema: GenerateDailyChallengeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
