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

// Mapeamento de tipos de risco para dados de simulação
const mockDataMap = {
    flood: {
        simulationResults: 'Aumento projetado de 15% nas chuvas na próxima década, levando a inundações urbanas mais frequentes e severas.',
        cityData: 'A cidade possui extensas áreas impermeabilizadas, especialmente nas zonas centrais, e uma rede de drenagem sobrecarregada.',
        climateData: 'Previsão do NASA POWER indica eventos de chuva extrema mais recorrentes para a região metropolitana.',
    },
    drought: {
        simulationResults: 'Projeção de redução de 20% no volume dos reservatórios nos próximos 5 anos, com períodos de estiagem mais longos.',
        cityData: 'Alto consumo de água per capita e perdas significativas na rede de distribuição.',
        climateData: 'Modelos climáticos do Copernicus apontam para uma diminuição da precipitação média anual e aumento da evaporação.',
    },
    'heat island': {
        simulationResults: 'Aumento médio de 4-6°C nas áreas centrais em comparação com as áreas rurais adjacentes, especialmente durante a noite.',
        cityData: 'Dados urbanos de Goiânia: alta densidade no Setor Oeste, poucas áreas verdes e abundância de superfícies escuras (asfalto, telhados).',
        climateData: 'Tendência de aumento nas temperaturas médias e maior frequência de ondas de calor, conforme dados do INMET.',
    },
    landslide: {
        simulationResults: 'Risco elevado de deslizamentos em 3 áreas de encosta densamente ocupadas, com chuvas intensas sendo o principal gatilho.',
        cityData: 'Ocupação irregular em áreas de alta declividade, com construções precárias e sistemas de contenção inadequados.',
        climateData: 'Padrões de chuva concentrada em curtos períodos aumentam a saturação do solo, elevando o risco de instabilidade.',
    }
};


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

        const { simulationResults, cityData, climateData } = mockDataMap[riskType];

        const [summaryResult, recommendationsResult] = await Promise.all([
            summarizeClimateRiskReport({ region, simulationResults }),
            generateMitigationRecommendations({ region, riskType, cityData, climateData })
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
