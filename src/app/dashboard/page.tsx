import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, AlertTriangle, Droplets, Sun, Thermometer, ShieldCheck } from 'lucide-react';

const overviewItems = [
  { title: 'Regions Monitored', value: '5', icon: Map, color: 'text-primary' },
  { title: 'Active Alerts', value: '3', icon: AlertTriangle, color: 'text-destructive' },
  { title: 'Flood Risk', value: 'High', icon: Droplets, color: 'text-blue-500' },
  { title: 'Drought Risk', value: 'Low', icon: Sun, color: 'text-yellow-500' },
  { title: 'Heat Island Effect', value: 'Medium', icon: Thermometer, color: 'text-orange-500' },
  { title: 'Mitigation Actions', value: '12', icon: ShieldCheck, color: 'text-green-500' },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Planner!</h1>
        <p className="text-muted-foreground">
          Here&apos;s a quick overview of your city&apos;s climate resilience status.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {overviewItems.map((item) => (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className={`h-5 w-5 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <p className="text-muted-foreground">No recent activity to show.</p>
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Risk Hotspots</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">An interactive heatmap would be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
