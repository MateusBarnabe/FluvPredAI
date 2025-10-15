import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FilePlus } from 'lucide-react';

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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Relatórios Gerados</CardTitle>
          <Button asChild>
            <Link href="/dashboard/simulation">
              <FilePlus className="mr-2 h-4 w-4" />
              Gerar Relatório
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
            <p>Nenhum relatório foi gerado ainda.</p>
            <p className="text-sm">Clique em &quot;Gerar Relatório&quot; para começar.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
