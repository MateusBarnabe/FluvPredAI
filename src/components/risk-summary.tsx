import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface RiskSummaryProps {
  summary: string;
}

export default function RiskSummary({ summary }: RiskSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          AI-Generated Risk Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/90">{summary}</p>
      </CardContent>
    </Card>
  );
}
