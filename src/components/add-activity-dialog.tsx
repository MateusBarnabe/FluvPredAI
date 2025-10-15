'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Activity } from '@/lib/types';

interface AddActivityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Activity, 'id' | 'status' | 'history' | 'cancellationReason'>) => void;
}

export function AddActivityDialog({ isOpen, onClose, onSave }: AddActivityDialogProps) {
  const [description, setDescription] = useState('');
  const [responsible, setResponsible] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setDescription('');
      setResponsible('');
      setDetails('');
      setError('');
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!description || !responsible || !details) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    onSave({ description, responsible, details });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Adicionar Nova Atividade</DialogTitle>
          <DialogDescription>Preencha os detalhes da nova atividade de mitigação.</DialogDescription>
        </DialogHeader>
        <div className="mt-4 grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição da Atividade</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Construção de barreira de contenção"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="responsible">Órgão Responsável</Label>
            <Input
              id="responsible"
              value={responsible}
              onChange={(e) => setResponsible(e.target.value)}
              placeholder="Ex: Secretaria de Infraestrutura"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="details">Detalhes e Justificativa</Label>
            <Textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Descreva a importância e o escopo desta atividade."
              rows={4}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleSave}>Salvar Atividade</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}