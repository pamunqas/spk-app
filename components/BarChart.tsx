'use client'
import { useEffect, useRef } from 'react'
import type { Chart as ChartType, ChartConfiguration } from 'chart.js'

interface BarChartProps {
  labels: string[]
  data: number[]
  colors?: string[]
  tooltipLabel?: (val: number, idx: number) => string
}

const CHART_DEFAULTS = {
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1A1A26',
      borderColor: 'rgba(255,255,255,0.1)',
      borderWidth: 1,
      titleColor: '#F0F0F8',
      bodyColor: '#9494B0',
      padding: 10,
    },
  },
  scales: {
    x: {
      grid: { color: 'rgba(255,255,255,0.04)' },
      ticks: { color: '#5A5A72', font: { family: "'JetBrains Mono'", size: 10 } },
      border: { color: 'transparent' },
    },
    y: {
      grid: { display: false },
      ticks: { color: '#9494B0', font: { family: "'DM Sans'", size: 12 } },
      border: { color: 'transparent' },
    },
  },
}

export default function BarChart({ labels, data, colors, tooltipLabel }: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef  = useRef<ChartType | null>(null)

  useEffect(() => {
    let destroyed = false
    ;(async () => {
      const { Chart, BarElement, CategoryScale, LinearScale, Tooltip } = await import('chart.js')
      Chart.register(BarElement, CategoryScale, LinearScale, Tooltip)
      if (destroyed || !canvasRef.current) return
      if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null }

      const bgColors = colors ?? data.map(() => '#6366F180')
      const config: ChartConfiguration = {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            data,
            backgroundColor: bgColors,
            borderRadius: 5,
            borderSkipped: false,
          }],
        },
        options: {
          ...CHART_DEFAULTS,
          plugins: {
            ...CHART_DEFAULTS.plugins,
            tooltip: {
              ...CHART_DEFAULTS.plugins.tooltip,
              callbacks: tooltipLabel
                ? { label: (ctx: any) => ' ' + tooltipLabel(ctx.raw as number, ctx.dataIndex) }
                : undefined,
            },
          },
        } as any,
      }
      chartRef.current = new Chart(canvasRef.current, config)
    })()
    return () => { destroyed = true; chartRef.current?.destroy() }
  }, [labels, data, colors, tooltipLabel])

  return <canvas ref={canvasRef} />
}
