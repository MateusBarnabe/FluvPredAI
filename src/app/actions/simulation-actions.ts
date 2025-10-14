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
  region: z.string().min(1, 'Region is required.'),
  riskType: z.enum(['flood', 'drought', 'heat island']),
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
                error: validatedFields.error.flatten().fieldErrors.region?.[0] || 'Invalid input.',
            };
        }

        const { region, riskType } = validatedFields.data;

        // Mock data as specified in the project description
        const mockSimulationResults = 'Projected increase in rainfall by 15% over the next decade, leading to more frequent and severe urban flooding.';
        const mockCityData = 'Urban data for Goiania: high density in Setor Oeste, limited green spaces.';
        const mockClimateData = 'NASA POWER forecast shows a trend of rising temperatures and more extreme weather events for the region.';

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
        const error = e instanceof Error ? e.message : 'An unknown error occurred.';
        console.error(error);
        return {
            summary: null,
            recommendations: null,
            error: `AI processing failed: ${error}`,
        };
    }
}
