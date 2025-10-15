
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FilePlus, Cpu, Download, FileText, CalendarDays } from 'lucide-react';

const savedReports = {
  '2025': Array.from({ length: 9 }, (_, i) => new Date(0, i).toLocaleString('pt-BR', { month: 'long' }).replace(/^\w/, c => c.toUpperCase())),
  '2024': Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('pt-BR', { month: 'long' }).replace(/^\w/, c => c.toUpperCase())),
  '2023': Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('pt-BR', { month: 'long' }).replace(/^\w/, c => c.toUpperCase())),
  '2022': Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('pt-BR', { month: 'long' }).replace(/^\w/, c => c.toUpperCase())),
};


export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Central de Relatórios</h1>
        <p className="text-muted-foreground">
          Gere, visualize e gerencie relatórios de risco climático e mitigação.
        </p>
      </div>

      <Tabs defaultValue="generate">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generate">Gerar Relatório</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>
        <TabsContent value="generate">
          <Card>
            <CardHeader>
              <CardTitle>Gerar Novos Relatórios</CardTitle>
              <CardDescription>
                Crie relatórios diários rápidos ou personalizados com base em simulações detalhadas.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-4 p-6 bg-muted/50 rounded-lg justify-between">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Relatório Diário Rápido</h3>
                    <p className="text-sm text-muted-foreground">
                        Gere um relatório instantâneo com os dados e alertas mais recentes do dia.
                    </p>
                </div>
                <Button>
                    <FilePlus className="mr-2 h-4 w-4" />
                    Gerar Relatório Diário
                </Button>
              </div>
               <div className="flex flex-col gap-4 p-6 bg-muted/50 rounded-lg justify-between">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Relatório de Simulação</h3>
                    <p className="text-sm text-muted-foreground">
                        Vá para a área de simulação para criar um relatório detalhado com base em cenários específicos.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/simulation">
                        <Cpu className="mr-2 h-4 w-4" />
                        Criar Relatório Personalizado
                    </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Salvos</CardTitle>
              <CardDescription>
                Acesse relatórios mensais e anuais arquivados.
              </CardDescription>
            </CardHeader>
            <CardContent>
                {Object.keys(savedReports).length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                    {Object.entries(savedReports).sort((a, b) => b[0].localeCompare(a[0])).map(([year, months]) => (
                    <AccordionItem key={year} value={year}>
                        <AccordionTrigger className="text-lg font-medium">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-5 w-5" />
                                Ano de {year}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-4">
                            {months.map((month) => (
                            <Card key={month} className="flex flex-col justify-between">
                                <CardHeader className="p-4">
                                <CardTitle className="flex items-center gap-2 text-base">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  {month}
                                </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                <Button variant="outline" size="sm" className="w-full">
                                    <Download className="mr-2 h-4 w-4" />
                                    Baixar
                                </Button>
                                </CardContent>
                            </Card>
                            ))}
                        </div>
                        </AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>
                ) : (
                <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                    <p>Nenhum relatório foi gerado ainda.</p>
                </div>
                )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
