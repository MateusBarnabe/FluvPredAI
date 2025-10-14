'use client';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Cpu, Loader2 } from 'lucide-react';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Simulando...
                </>
            ) : (
                <>
                    <Cpu className="mr-2 h-4 w-4" />
                    Executar Simulação
                </>
            )}
        </Button>
    );
}

interface SimulationFormProps {
    formAction: (formData: FormData) => void;
}

export function SimulationForm({ formAction }: SimulationFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Parâmetros da Simulação</CardTitle>
        <CardDescription>Configure o cenário para simular.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="region">Região</Label>
            <Input id="region" name="region" placeholder="ex: Setor Oeste, Goiânia" defaultValue="Setor Oeste" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="riskType">Risco Climático</Label>
            <Select name="riskType" defaultValue="flood">
              <SelectTrigger id="riskType">
                <SelectValue placeholder="Selecione o tipo de risco" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="flood">Enchente</SelectItem>
                <SelectItem value="drought">Seca</SelectItem>
                <SelectItem value="heat island">Ilha de Calor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
