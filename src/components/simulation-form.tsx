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
                    Simulating...
                </>
            ) : (
                <>
                    <Cpu className="mr-2 h-4 w-4" />
                    Run Simulation
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
        <CardTitle>Simulation Parameters</CardTitle>
        <CardDescription>Configure the scenario to simulate.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="region">Region</Label>
            <Input id="region" name="region" placeholder="e.g., Setor Oeste, Goiania" defaultValue="Setor Oeste" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="riskType">Climate Risk</Label>
            <Select name="riskType" defaultValue="flood">
              <SelectTrigger id="riskType">
                <SelectValue placeholder="Select risk type" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="flood">Flood</SelectItem>
                <SelectItem value="drought">Drought</SelectItem>
                <SelectItem value="heat island">Heat Island</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
