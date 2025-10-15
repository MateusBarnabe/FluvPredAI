import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { Activity, Status, Priority } from '@/lib/types';
import { Calendar, ListChecks, User, Info, XCircle, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ActivityDetailsDialogProps {
  activity: Activity;
  isOpen: boolean;
  onClose: () => void;
  statusVariants: Record<Status, string>;
  priorityVariants: Record<Priority, string>;
}

export function ActivityDetailsDialog({ activity, isOpen, onClose, statusVariants, priorityVariants }: ActivityDetailsDialogProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold pr-8">{activity.description}</DialogTitle>
          <DialogDescription>Detalhes e histórico da atividade</DialogDescription>
        </DialogHeader>
        <div className="mt-4 grid gap-6">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <div>
                        <p className="text-sm text-muted-foreground">Responsável</p>
                        <p className="font-medium">{activity.responsible}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-4 text-right">
                    <div>
                        <p className="text-sm text-muted-foreground">Prioridade</p>
                        <Badge variant="outline" className={cn("font-semibold", priorityVariants[activity.priority])}>
                           <Tag className="mr-1.5 h-3 w-3" />
                           {activity.priority}
                        </Badge>
                    </div>
                </div>
            </div>

            <Separator />

            <div>
                <p className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Info className="w-5 h-5" />
                    <span>Detalhes e Justificativa</span>
                </p>
                <p className="text-sm bg-muted/50 p-3 rounded-md">{activity.details}</p>
            </div>

            {activity.cancellationReason && (
                <div>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground mb-2 font-medium text-destructive">
                        <XCircle className="w-5 h-5" />
                        <span>Motivo do Cancelamento</span>
                    </p>
                    <p className="text-sm text-destructive/90 bg-destructive/10 p-3 rounded-md">{activity.cancellationReason}</p>
                </div>
            )}
            
            <Separator />

            <div>
                <p className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <ListChecks className="w-5 h-5" />
                    <span>Histórico de Status</span>
                </p>
                <ul className="space-y-4">
                {activity.history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((hist, index) => (
                    <li key={index} className="flex items-start gap-4">
                         <div className="flex flex-col items-center">
                            <div className={cn("w-3 h-3 rounded-full mt-1.5", statusVariants[hist.status])} />
                            {index < activity.history.length - 1 && (
                                <div className="w-px h-8 bg-border" />
                            )}
                        </div>
                        <div>
                            <Badge className={cn(statusVariants[hist.status], "font-semibold")}>
                                {hist.status}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {format(new Date(hist.date), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                            </p>
                        </div>
                    </li>
                ))}
                </ul>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
 