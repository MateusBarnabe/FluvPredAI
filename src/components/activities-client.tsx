'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ActivityDetailsDialog } from './activity-details-dialog';
import type { Activity, Status } from '@/lib/types';


const initialActivities: Activity[] = [
  { 
    id: 1, 
    description: 'Construção de bacia de retenção no Setor Oeste', 
    responsible: 'Secretaria de Infraestrutura', 
    status: 'Em Andamento',
    details: 'Construção de uma bacia de contenção de águas pluviais para mitigar os riscos de inundação na área mais baixa do Setor Oeste, que historicamente sofre com alagamentos em períodos de chuva intensa.',
    history: [
      { status: 'Prevista', date: new Date('2023-10-15') },
      { status: 'Em Andamento', date: new Date('2024-03-01') },
    ],
    cancellationReason: null,
  },
  { 
    id: 2, 
    description: 'Limpeza e desassoreamento do Córrego Central', 
    responsible: 'Secretaria do Meio Ambiente', 
    status: 'Prevista',
    details: 'Remoção de sedimentos e detritos do leito do Córrego Central para aumentar sua capacidade de vazão e prevenir transbordamentos.',
    history: [
      { status: 'Prevista', date: new Date('2024-01-20') },
    ],
    cancellationReason: null,
  },
  { 
    id: 3, 
    description: 'Criação de 500m² de telhados verdes na região central', 
    responsible: 'Iniciativa Privada', 
    status: 'Prevista',
    details: 'Incentivo à instalação de telhados verdes em edifícios comerciais para ajudar na absorção da água da chuva e na redução do efeito de ilha de calor.',
    history: [
      { status: 'Prevista', date: new Date('2024-02-10') },
    ],
    cancellationReason: null,
  },
  { 
    id: 4, 
    description: 'Sistema de alerta de enchentes via SMS', 
    responsible: 'Defesa Civil', 
    status: 'Concluida',
    details: 'Implementação de um sistema automatizado para enviar alertas de risco de enchente para os moradores de áreas vulneráveis via mensagem de texto.',
    history: [
      { status: 'Prevista', date: new Date('2023-08-01') },
      { status: 'Em Andamento', date: new Date('2023-09-05') },
      { status: 'Concluida', date: new Date('2023-11-20') },
    ],
    cancellationReason: null,
  },
  { 
    id: 5, 
    description: 'Plantio de 1.000 árvores nativas nas margens dos rios', 
    responsible: 'Secretaria do Meio Ambiente', 
    status: 'Em Andamento',
    details: 'Projeto de reflorestamento das matas ciliares para estabilização das margens e melhoria da qualidade da água.',
    history: [
      { status: 'Prevista', date: new Date('2023-11-05') },
      { status: 'Em Andamento', date: new Date('2024-04-15') },
    ],
    cancellationReason: null,
  },
  { 
    id: 6, 
    description: 'Estudo de viabilidade para parque linear', 
    responsible: 'Secretaria de Planejamento', 
    status: 'Cancelada',
    details: 'Análise da viabilidade técnica e financeira para a criação de um parque linear ao longo do principal rio da cidade.',
    history: [
      { status: 'Prevista', date: new Date('2023-06-01') },
      { status: 'Cancelada', date: new Date('2024-01-30') },
    ],
    cancellationReason: 'Restrições orçamentárias impediram a continuação do projeto. Será reavaliado no próximo ciclo fiscal.',
  },
  { 
    id: 7, 
    description: 'Revisão do plano diretor para áreas de risco', 
    responsible: 'Secretaria de Planejamento', 
    status: 'Concluida',
    details: 'Atualização do plano diretor municipal com novas diretrizes de zoneamento e construção para áreas identificadas com alto risco climático.',
    history: [
      { status: 'Prevista', date: new Date('2023-02-01') },
      { status: 'Em Andamento', date: new Date('2023-05-10') },
      { status: 'Concluida', date: new Date('2024-02-28') },
    ],
    cancellationReason: null,
  },
];

const statusVariants: Record<Status, string> = {
    Prevista: "bg-gray-200 text-gray-800 border-gray-300",
    "Em Andamento": "bg-blue-100 text-blue-800 border-blue-200",
    Concluida: "bg-green-100 text-green-800 border-green-200",
    Cancelada: "bg-red-100 text-red-800 border-red-200",
};


export function ActivitiesClient() {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const handleStatusChange = (activityId: number, newStatus: Status) => {
    setActivities(currentActivities =>
      currentActivities.map(activity =>
        activity.id === activityId 
        ? { 
            ...activity, 
            status: newStatus,
            history: [...activity.history, { status: newStatus, date: new Date() }]
          } 
        : activity
      )
    );
  };
  
  const handleRowClick = (activity: Activity) => {
    setSelectedActivity(activity);
  };

  const handleDialogClose = () => {
    setSelectedActivity(null);
  };

  return (
    <>
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
                <TableRow 
                  key={activity.id} 
                  onClick={() => handleRowClick(activity)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium">{activity.description}</TableCell>
                  <TableCell className="text-muted-foreground">{activity.responsible}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
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
      {selectedActivity && (
        <ActivityDetailsDialog 
            activity={selectedActivity} 
            isOpen={!!selectedActivity} 
            onClose={handleDialogClose}
            statusVariants={statusVariants}
        />
      )}
    </>
  );
}