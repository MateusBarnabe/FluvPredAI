'use server';
/**
 * @fileOverview A climate risk report summarization AI agent.
 *
 * - summarizeClimateRiskReport - A function that summarizes the climate risk report for a specific region.
 * - SummarizeClimateRiskReportInput - The input type for the summarizeClimateRiskReport function.
 * - SummarizeClimateRiskReportOutput - The return type for the summarizeClimateRiskReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeClimateRiskReportInputSchema = z.object({
  region: z.string().describe('The region for which to summarize the climate risk report.'),
  simulationResults: z.string().describe('The simulation results for the specified region.'),
});
export type SummarizeClimateRiskReportInput = z.infer<typeof SummarizeClimateRiskReportInputSchema>;

const SummarizeClimateRiskReportOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the projected climate risks for the specified region.'),
});
export type SummarizeClimateRiskReportOutput = z.infer<typeof SummarizeClimateRiskReportOutputSchema>;

export async function summarizeClimateRiskReport(input: SummarizeClimateRiskReportInput): Promise<SummarizeClimateRiskReportOutput> {
  return summarizeClimateRiskReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeClimateRiskReportPrompt',
  input: {schema: SummarizeClimateRiskReportInputSchema},
  output: {schema: SummarizeClimateRiskReportOutputSchema},
  prompt: `You are a climate resilience urban planner.
Your task is to summarize climate risks for a specific city region based on simulation results.
Highlight key vulnerabilities and potential impacts in a concise summary.
Respond in Brazilian Portuguese.

Region: {{{region}}}
Simulation Results: {{{simulationResults}}}
`,
});

const summarizeClimateRiskReportFlow = ai.defineFlow(
  {
    name: 'summarizeClimateRiskReportFlow',
    inputSchema: SummarizeClimateRiskReportInputSchema,
    outputSchema: SummarizeClimateRiskReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
 