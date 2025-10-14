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
  prompt: `You are an expert city planner specializing in climate resilience.

You will use the simulation results to summarize the climate risks for the specified region, highlighting the key vulnerabilities and potential impacts.

Region: {{{region}}}
Simulation Results: {{{simulationResults}}}

Provide a concise summary that city officials can quickly understand and communicate to stakeholders.
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
