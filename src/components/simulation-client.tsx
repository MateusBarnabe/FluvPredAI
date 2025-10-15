'use client';

import { useActionState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SimulationForm } from './simulation-form';
import RiskSummary from './risk-summary';
import MitigationRecommendations from './mitigation-recommendations';
import MapView from './map-view';
import RiskChart from './risk-chart';
import { handleSimulation } from '@/app/actions/simulation-actions';
import type { SimulationState } from '@/app/actions/simulation-actions';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const initialState: SimulationState = {
  summary: null,
  recommendations: null,
  error: null,
};

export function SimulationClient() {
  const [state, formAction] = useActionState(handleSimulation, initialState);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1 flex flex-col gap-6">
        <SimulationForm formAction={formAction} />
        <MapView />
      </div>
      <div className="lg:col-span-2 flex flex-col gap-6">
        {state.error && (
          <Alert variant="destructive">
            <AlertTitle>Erro na Simulação</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        {!state.summary && !state.recommendations && !state.error && (
            <Card>
                <CardContent className='p-6'>
                    <div className='text-center text-muted-foreground py-12'>
                        <h3 className='text-lg font-semibold mb-2'>Os resultados aparecerão aqui</h3>
                        <p>Configure e execute uma simulação para ver os resultados.</p>
                    </div>
                </CardContent>
            </Card>
        )}
        
        {state.summary && <RiskSummary summary={state.summary.summary} />}
        {state.recommendations && <MitigationRecommendations recommendations={state.recommendations.recommendations} />}
        {(state.summary || state.recommendations) && <RiskChart />}
      </div>
    </div>
  );
}
