import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ShieldCheck } from 'lucide-react';
import type { GenerateMitigationRecommendationsOutput } from '@/ai/flows/generate-mitigation-recommendations';

interface MitigationRecommendationsProps {
  recommendations: GenerateMitigationRecommendationsOutput['recommendations'];
}

export default function MitigationRecommendations({ recommendations }: MitigationRecommendationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5" />
          Recomendações de Mitigação com IA
        </CardTitle>
        <CardDescription>
          Passos acionáveis para melhorar a resiliência climática na região selecionada.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ação</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead className="text-right">Impacto Esperado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recommendations.map((rec, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{rec.action}</TableCell>
                <TableCell>{rec.location}</TableCell>
                <TableCell className="text-right font-semibold text-accent">{rec.impact}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
