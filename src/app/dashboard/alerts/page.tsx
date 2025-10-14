import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, CheckCircle2 } from 'lucide-react';

export default function AlertsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Alertas</h1>
        <p className="text-muted-foreground">
          Revise os alertas automatizados de alto risco climático.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Alertas Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center text-center p-8 gap-4 border-2 border-dashed rounded-lg">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
            <h3 className="text-xl font-semibold">Tudo Limpo!</h3>
            <p className="text-muted-foreground">Não há alertas de alto risco ativos no momento.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
