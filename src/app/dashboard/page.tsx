import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, AlertTriangle, Droplets, Sun, Thermometer, ShieldCheck } from 'lucide-react';

const overviewItems = [
  { title: 'Regiões Monitoradas', value: '5', icon: Map, color: 'text-primary' },
  { title: 'Alertas Ativos', value: '3', icon: AlertTriangle, color: 'text-destructive' },
  { title: 'Risco de Enchente', value: 'Alto', icon: Droplets, color: 'text-blue-500' },
  { title: 'Risco de Seca', value: 'Baixo', icon: Sun, color: 'text-yellow-500' },
  { title: 'Efeito Ilha de Calor', value: 'Médio', icon: Thermometer, color: 'text-orange-500' },
  { title: 'Ações de Mitigação', value: '12', icon: ShieldCheck, color: 'text-green-500' },
];

export default function DashboardPage() {
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
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <p className="text-muted-foreground">Nenhuma atividade recente para mostrar.</p>
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
