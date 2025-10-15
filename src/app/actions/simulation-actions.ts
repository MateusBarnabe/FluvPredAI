'use server';

import { z } from 'zod';
import { summarizeClimateRiskReport } from '@/ai/flows/summarize-climate-risk-report';
import { generateMitigationRecommendations } from '@/ai/flows/generate-mitigation-recommendations';
import type { SummarizeClimateRiskReportOutput } from '@/ai/flows/summarize-climate-risk-report';
import type { GenerateMitigationRecommendationsOutput } from '@/ai/flows/generate-mitigation-recommendations';

export interface SimulationState {
    summary: SummarizeClimateRiskReportOutput | null;
    recommendations: GenerateMitigationRecommendationsOutput | null;
    error: string | null;
}

const formSchema = z.object({
  region: z.string().min(1, 'Região é obrigatória.'),
  riskType: z.enum(['flood', 'drought', 'heat island', 'landslide']),
});

export async function handleSimulation(
    prevState: SimulationState,
    formData: FormData
): Promise<SimulationState> {
    try {
        const validatedFields = formSchema.safeParse({
            region: formData.get('region'),
            riskType: formData.get('riskType'),
        });

        if (!validatedFields.success) {
            return {
                summary: null,
                recommendations: null,
                error: validatedFields.error.flatten().fieldErrors.region?.[0] || 'Entrada inválida.',
            };
        }

        const { region, riskType } = validatedFields.data;

        // Mock data as specified in the project description
        const mockSimulationResults = 'Aumento projetado de 15% nas chuvas na próxima década, levando a inundações urbanas mais frequentes e severas.';
        const mockCityData = 'Dados urbanos de Goiânia: alta densidade no Setor Oeste, espaços verdes limitados.';
        const mockClimateData = 'Previsão do NASA POWER mostra tendência de aumento das temperaturas e eventos climáticos mais extremos para a região.';

        const [summaryResult, recommendationsResult] = await Promise.all([
            summarizeClimateRiskReport({ region, simulationResults: mockSimulationResults }),
            generateMitigationRecommendations({ region, riskType, cityData: mockCityData, climateData: mockClimateData })
        ]);

        return {
            summary: summaryResult,
            recommendations: recommendationsResult,
            error: null,
        };

    } catch (e) {
        const error = e instanceof Error ? e.message : 'Ocorreu um erro desconhecido.';
        console.error(error);
        return {
            summary: null,
            recommendations: null,
            error: `Falha no processamento da IA: ${error}`,
        };
    }
}
