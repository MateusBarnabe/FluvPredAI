export type Status = 'Prevista' | 'Em Andamento' | 'Concluida' | 'Cancelada';

export interface Activity {
  id: number;
  description: string;
  responsible: string;
  status: Status;
  details: string;
  history: {
    status: Status;
    date: Date;
  }[];
  cancellationReason: string | null;
}
