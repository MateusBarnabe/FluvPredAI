import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-muted-foreground">
          Visualize e gere relatórios de risco climático e mitigação.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Gerados</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Nenhum relatório foi gerado ainda.</p>
        </CardContent>
      </Card>
    </div>
  );
}
