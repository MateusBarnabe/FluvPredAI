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
  prompt: `Você é um planejador urbano especialista em resiliência climática.

Você usará os resultados da simulação para resumir os riscos climáticos para a região especificada, destacando as principais vulnerabilidades e os impactos potenciais.

Responda em Português (Brasil).

Região: {{{region}}}
Resultados da Simulação: {{{simulationResults}}}

Forneça um resumo conciso que os funcionários da cidade possam entender e comunicar rapidamente às partes interessadas.
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
