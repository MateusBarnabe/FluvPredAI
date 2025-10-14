import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, CheckCircle2 } from 'lucide-react';

export default function AlertsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Alerts</h1>
        <p className="text-muted-foreground">
          Review automated high-risk climate alerts.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center text-center p-8 gap-4 border-2 border-dashed rounded-lg">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
            <h3 className="text-xl font-semibold">All Clear!</h3>
            <p className="text-muted-foreground">There are no active high-risk alerts at the moment.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
