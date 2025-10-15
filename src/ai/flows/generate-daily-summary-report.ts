'use server';
/**
 * @fileOverview Generates a daily summary report of climate risks for the entire city.
 *
 * - generateDailySummaryReport - A function that generates a summary of potential daily risks.
 * - GenerateDailySummaryReportInput - The input type for the function.
 * - GenerateDailySummaryReportOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDailySummaryReportInputSchema = z.object({
  city: z.string().describe("The name of the city, e.g., 'Goiânia'."),
  dailyClimateData: z.string().describe("A summary of the day's weather forecast and recent climate events."),
});
export type GenerateDailySummaryReportInput = z.infer<typeof GenerateDailySummaryReportInputSchema>;

const GenerateDailySummaryReportOutputSchema = z.object({
  report: z.string().describe('A concise summary of the potential daily climate risks for the entire city, focusing only on problems, not solutions. Should be formatted as a single block of text.'),
});
export type GenerateDailySummaryReportOutput = z.infer<typeof GenerateDailySummaryReportOutputSchema>;

export async function generateDailySummaryReport(input: GenerateDailySummaryReportInput): Promise<GenerateDailySummaryReportOutput> {
  return generateDailySummaryReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDailySummaryReportPrompt',
  input: {schema: GenerateDailySummaryReportInputSchema},
  output: {schema: GenerateDailySummaryReportOutputSchema},
  prompt: `You are a climate risk monitoring system for urban planners.
Your task is to generate a brief daily executive summary about potential climate risks for the entire city of {{{city}}}.
Base your summary on the provided daily climate data.
Analyze the potential for floods, droughts, heat islands, and landslides.
Your response must be in Brazilian Portuguese.
Crucially, focus ONLY on identifying and informing about the potential daily problems. DO NOT provide any recommendations or solutions.

Daily Climate Data:
"{{{dailyClimateData}}}"

Generate the summary now.
`,
});

const generateDailySummaryReportFlow = ai.defineFlow(
  {
    name: 'generateDailySummaryReportFlow',
    inputSchema: GenerateDailySummaryReportInputSchema,
    outputSchema: GenerateDailySummaryReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
