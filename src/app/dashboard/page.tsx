
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, AlertTriangle, Droplets, Sun, Thermometer, ShieldCheck, History } from 'lucide-react';
import { initialActivities } from '@/lib/activity-data';
import type { Activity } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const overviewItems = [
  { title: 'Regiões Monitoradas', value: '7', icon: Map, color: 'text-primary' },
  { title: 'Alertas Ativos', value: '0', icon: AlertTriangle, color: 'text-destructive' },
  { title: 'Risco de Enchente', value: 'Alto', icon: Droplets, color: 'text-blue-500' },
  { title: 'Risco de Seca', value: 'Baixo', icon: Sun, color: 'text-yellow-500' },
  { title: 'Efeito Ilha de Calor', value: 'Médio', icon: Thermometer, color: 'text-orange-500' },
  { title: 'Ações de Mitigação', value: '7', icon: ShieldCheck, color: 'text-green-500' },
];

function getMostRecentActivity(activities: Activity[]): Activity | null {
  if (!activities || activities.length === 0) {
    return null;
  }

  return activities.reduce((mostRecent, current) => {
    const mostRecentDate = mostRecent.history.reduce((latest, h) => new Date(h.date) > latest ? new Date(h.date) : latest, new Date(0));
    const currentDate = current.history.reduce((latest, h) => new Date(h.date) > latest ? new Date(h.date) : latest, new Date(0));
    
    return currentDate > mostRecentDate ? current : mostRecent;
  });
}


export default function DashboardPage() {
    const mostRecentActivity = getMostRecentActivity(initialActivities);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bem-vindo(a) de volta, Planejador(a)!</h1>
        <p className="text-muted-foreground">
          Aqui está um resumo rápido do status de resiliência climática da sua cidade.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {overviewItems.map((item) => (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className={`h-5 w-5 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Atividade Recente
                </div>
                 <Button asChild variant="ghost" size="sm">
                    <Link href="/dashboard/activities">
                        Ver todas
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardTitle>
            <CardDescription>
                A última atividade adicionada ou atualizada no sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mostRecentActivity ? (
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-semibold">{mostRecentActivity.description}</p>
                  <p className="text-sm text-muted-foreground">
                    Status: <span className="font-medium text-foreground">{mostRecentActivity.status}</span>
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                    {new Date(mostRecentActivity.history[mostRecentActivity.history.length -1].date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
                </p>
              </div>
            ) : (
                <p className="text-muted-foreground">Nenhuma atividade recente para mostrar.</p>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Pontos Críticos de Risco</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Um mapa de calor interativo seria exibido aqui.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
 