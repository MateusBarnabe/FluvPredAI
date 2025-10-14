import { SimulationClient } from '@/components/simulation-client';

export default function SimulationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Simulação de Cenário Climático</h1>
        <p className="text-muted-foreground">
          Execute simulações para prever riscos climáticos e obter recomendações de mitigação com IA.
        </p>
      </div>
      <SimulationClient />
    </div>
  );
}
