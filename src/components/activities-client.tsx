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
import { initialActivities } from '@/lib/activity-data';
import { Plus, Tag } from 'lucide-react';
import { Badge } from './ui/badge';


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
