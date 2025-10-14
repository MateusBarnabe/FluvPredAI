"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp } from "lucide-react"

const chartData = [
  { year: "2025", risk: 45 },
  { year: "2030", risk: 55 },
  { year: "2035", risk: 62 },
  { year: "2040", risk: 78 },
  { year: "2045", risk: 85 },
  { year: "2050", risk: 92 },
]

const chartConfig = {
  risk: {
    label: "Pontuação de Risco",
    color: "hsl(var(--primary))",
  },
}

export default function RiskChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Risco Projetado ao Longo do Tempo
        </CardTitle>
        <CardDescription>
            Este gráfico ilustra o aumento projetado na pontuação de risco climático para o cenário selecionado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                domain={[0, 100]}
             />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="risk" fill="var(--color-risk)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
