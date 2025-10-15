'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ActivityDetailsDialog } from './activity-details-dialog';
import { AddActivityDialog } from './add-activity-dialog';
import type { Activity, Status, Priority } from '@/lib/types';
import { Plus, Tag } from 'lucide-react';
import { Badge } from './ui/badge';


const initialActivities: Activity[] = [
  { 
    id: 1, 
    description: 'Construção de bacia de retenção no Setor Oeste', 
    responsible: 'Secretaria de Infraestrutura', 
    status: 'Em Andamento',
    priority: 'Alta',
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
    priority: 'Média',
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
    status: 'Concluida',
    priority: 'Baixa',
    details: 'Incentivo à instalação de telhados verdes em edifícios comerciais para ajudar na absorção da água da chuva e na redução do efeito de ilha de calor.',
    history: [
      { status: 'Prevista', date: new Date('2024-02-10') },
      { status: 'Concluida', date: new Date('2024-06-01') },
    ],
    cancellationReason: null,
  },
  { 
    id: 4, 
    description: 'Sistema de alerta de enchentes via SMS', 
    responsible: 'Defesa Civil', 
    status: 'Concluida',
    priority: 'Alta',
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
    priority: 'Média',
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
    priority: 'Baixa',
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
    priority: 'Alta',
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
    Prevista: "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300",
    "Em Andamento": "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
    Concluida: "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
    Cancelada: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
};

const priorityVariants: Record<Priority, string> = {
    Baixa: "bg-gray-100 text-gray-700 border-gray-200",
    Média: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Alta: "bg-orange-100 text-orange-800 border-orange-200",
};


export function ActivitiesClient() {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<Status | 'Todos'>('Todos');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'Todos'>('Todos');

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

  const handleAddActivity = (newActivityData: Omit<Activity, 'id' | 'status' | 'history' | 'cancellationReason'> & { predictedDate: Date }) => {
    const newActivity: Activity = {
      id: Math.max(0, ...activities.map(a => a.id)) + 1,
      description: newActivityData.description,
      responsible: newActivityData.responsible,
      details: newActivityData.details,
      priority: newActivityData.priority,
      status: 'Prevista',
      history: [{ status: 'Prevista', date: newActivityData.predictedDate }],
      cancellationReason: null
    };
    setActivities(currentActivities => [newActivity, ...currentActivities]);
    setIsAddDialogOpen(false);
  };
  
  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const statusMatch = statusFilter === 'Todos' || activity.status === statusFilter;
      const priorityMatch = priorityFilter === 'Todos' || activity.priority === priorityFilter;
      return statusMatch && priorityMatch;
    });
  }, [activities, statusFilter, priorityFilter]);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle>Lista de Atividades</CardTitle>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={(value: Status | 'Todos') => setStatusFilter(value)}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Filtrar por status..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos Status</SelectItem>
                  <SelectItem value="Prevista">Prevista</SelectItem>
                  <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                  <SelectItem value="Concluida">Concluída</SelectItem>
                  <SelectItem value="Cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={(value: Priority | 'Todos') => setPriorityFilter(value)}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Filtrar por prioridade..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todas Prioridades</SelectItem>
                  <SelectItem value="Baixa">Baixa</SelectItem>
                  <SelectItem value="Média">Média</SelectItem>
                  <SelectItem value="Alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)} className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Nova Atividade
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Atividade</TableHead>
                <TableHead className="hidden md:table-cell">Responsável</TableHead>
                <TableHead className="w-[120px]">Prioridade</TableHead>
                <TableHead className="w-[180px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivities.length > 0 ? filteredActivities.map((activity) => (
                <TableRow 
                  key={activity.id} 
                  onClick={() => handleRowClick(activity)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium">{activity.description}</TableCell>
                  <TableCell className="text-muted-foreground hidden md:table-cell">{activity.responsible}</TableCell>
                   <TableCell>
                    <Badge variant="outline" className={cn("font-semibold", priorityVariants[activity.priority])}>
                      <Tag className="mr-1.5 h-3 w-3" />
                      {activity.priority}
                    </Badge>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Select
                      value={activity.status}
                      onValueChange={(value: Status) => handleStatusChange(activity.id, value)}
                    >
                      <SelectTrigger className={cn("w-full text-left font-semibold", statusVariants[activity.status])}>
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
              )) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    Nenhuma atividade encontrada com os filtros selecionados.
                  </TableCell>
                </TableRow>
              )}
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
            priorityVariants={priorityVariants}
        />
      )}
      <AddActivityDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddActivity}
      />
    </>
  );
}
