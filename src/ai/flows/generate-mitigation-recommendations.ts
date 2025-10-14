
// src/ai/flows/generate-mitigation-recommendations.ts
'use server';

/**
 * @fileOverview Generates mitigation recommendations for climate risks.
 *
 * - generateMitigationRecommendations - A function that generates specific, actionable recommendations for mitigating climate risks.
 * - GenerateMitigationRecommendationsInput - The input type for the generateMitigationRecommendations function.
 * - GenerateMitigationRecommendationsOutput - The return type for the generateMitigationRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMitigationRecommendationsInputSchema = z.object({
  cityData: z.string().describe('Urban data including maps, drainage network, terrain, and land use.'),
  climateData: z.string().describe('Climate data including historical, current, and forecast data.'),
  riskType: z.enum(['flood', 'drought', 'heat island']).describe('The type of climate risk to mitigate.'),
  region: z.string().describe('The specific region within the city to focus on.'),
});
export type GenerateMitigationRecommendationsInput = z.infer<typeof GenerateMitigationRecommendationsInputSchema>;

const GenerateMitigationRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      action: z.string().describe('Specific action to take, e.g., build a retention basin.'),
      location: z.string().describe('Optimal location for the action.'),
      impact: z.string().describe('Expected impact of the action, e.g., reduces flood risk by 38%.'),
    })
  ).describe('A list of actionable recommendations to mitigate the specified climate risk.'),
});
export type GenerateMitigationRecommendationsOutput = z.infer<typeof GenerateMitigationRecommendationsOutputSchema>;

export async function generateMitigationRecommendations(input: GenerateMitigationRecommendationsInput): Promise<GenerateMitigationRecommendationsOutput> {
  return generateMitigationRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMitigationRecommendationsPrompt',
  input: {schema: GenerateMitigationRecommendationsInputSchema},
  output: {schema: GenerateMitigationRecommendationsOutputSchema},
  prompt: `Você é um planejador urbano especialista em adaptação às mudanças climáticas.

  Com base nos dados da cidade, dados climáticos e no tipo de risco e região especificados, gere recomendações específicas e acionáveis para mitigar o risco climático.

  Responda em Português (Brasil).

  Dados da Cidade: {{{cityData}}}
  Dados Climáticos: {{{climateData}}}
  Tipo de Risco: {{{riskType}}}
  Região: {{{region}}}

  Formate suas recomendações como uma lista de ações, locais e impactos esperados.
  Exemplo:
  \`\`\`
  {
    "recommendations": [
      {
        "action": "Construir uma bacia de retenção",
        "location": "Setor Oeste",
        "impact": "Reduz o risco de inundação em 38%"
      }
    ]
  }
  \`\`\`
  `,
});

const generateMitigationRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateMitigationRecommendationsFlow',
    inputSchema: GenerateMitigationRecommendationsInputSchema,
    outputSchema: GenerateMitigationRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
