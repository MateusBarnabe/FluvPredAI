import { SimulationClient } from '@/components/simulation-client';

export default function SimulationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Climate Scenario Simulation</h1>
        <p className="text-muted-foreground">
          Run simulations to predict climate risks and get AI-powered mitigation recommendations.
        </p>
      </div>
      <SimulationClient />
    </div>
  );
}
