export type Status = 'Prevista' | 'Em Andamento' | 'Concluida' | 'Cancelada';
export type Priority = 'Baixa' | 'Média' | 'Alta';

export interface Activity {
  id: number;
  description: string;
  responsible: string;
  status: Status;
  priority: Priority;
  details: string;
  history: {
    status: Status;
    date: Date;
  }[];
  cancellationReason: string | null;
}
