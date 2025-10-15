'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';

type Status = 'Prevista' | 'Em Andamento' | 'Concluida' | 'Cancelada';

interface Activity {
  id: number;
  description: string;
  responsible: string;
  status: Status;
}

const initialActivities: Activity[] = [
  { id: 1, description: 'Construção de bacia de retenção no Setor Oeste', responsible: 'Secretaria de Infraestrutura', status: 'Em Andamento' },
  { id: 2, description: 'Limpeza e desassoreamento do Córrego Central', responsible: 'Secretaria do Meio Ambiente', status: 'Prevista' },
  { id: 3, description: 'Criação de 500m² de telhados verdes na região central', responsible: 'Iniciativa Privada', status: 'Prevista' },
  { id: 4, description: 'Sistema de alerta de enchentes via SMS', responsible: 'Defesa Civil', status: 'Concluida' },
  { id: 5, description: 'Plantio de 1.000 árvores nativas nas margens dos rios', responsible: 'Secretaria do Meio Ambiente', status: 'Em Andamento' },
  { id: 6, description: 'Estudo de viabilidade para parque linear', responsible: 'Secretaria de Planejamento', status: 'Cancelada' },
  { id: 7, description: 'Revisão do plano diretor para áreas de risco', responsible: 'Secretaria de Planejamento', status: 'Concluida' },
];

const statusVariants: Record<Status, string> = {
    Prevista: "bg-gray-200 text-gray-800 border-gray-300",
    "Em Andamento": "bg-blue-100 text-blue-800 border-blue-200",
    Concluida: "bg-green-100 text-green-800 border-green-200",
    Cancelada: "bg-red-100 text-red-800 border-red-200",
};


export function ActivitiesClient() {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  const handleStatusChange = (activityId: number, newStatus: Status) => {
    setActivities(currentActivities =>
      currentActivities.map(activity =>
        activity.id === activityId ? { ...activity, status: newStatus } : activity
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Atividades</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Atividade</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead className="w-[180px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">{activity.description}</TableCell>
                <TableCell className="text-muted-foreground">{activity.responsible}</TableCell>
                <TableCell>
                  <Select
                    value={activity.status}
                    onValueChange={(value: Status) => handleStatusChange(activity.id, value)}
                  >
                    <SelectTrigger className={cn("w-[160px] text-left font-semibold", statusVariants[activity.status])}>
                       <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Prevista">Prevista</SelectItem>
                      <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                      <SelectItem value="Concluida">Concluída</SelectItem>
                      <SelectItem value="Cancelada">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
