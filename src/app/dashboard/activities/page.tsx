import { ActivitiesClient } from '@/components/activities-client';

export default function ActivitiesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Atividades de Mitigação</h1>
        <p className="text-muted-foreground">
          Acompanhe o progresso das ações planejadas para aumentar a resiliência da cidade.
        </p>
      </div>
      <ActivitiesClient />
    </div>
  );
}
 