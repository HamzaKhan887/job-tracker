'use client'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'

import { useQuery } from '@tanstack/react-query'
import { getChartsDataAction } from '@/utils/actions'

const COLOURS = ['#2563eb', '#16a34a', '#f59e0b']

function ChartsContainer() {
  const { data, isPending } = useQuery({
    queryKey: ['charts'],
    queryFn: () => getChartsDataAction(),
  })

  if (isPending) return <h2 className='text-xl font-medium'>Please wait...</h2>
  if (!data || data.monthlyApplications.length < 1) return null

  return (
    <>
      <section className='mt-16'>
        <h1 className='text-4xl font-semibold text-center'>
          Monthly Applications
        </h1>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={data.monthlyApplications} margin={{ top: 50 }}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
              labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
              itemStyle={{ color: 'hsl(var(--primary))' }}
            />
            <Bar dataKey='count' fill={COLOURS[0]} barSize={75} />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section className='mt-16 grid md:grid-cols-2 gap-8'>
        <div>
          <h2 className='text-2xl font-semibold text-center mb-4'>
            By Job Type
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={data.modeStats}
                dataKey='count'
                nameKey='name'
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
              >
                {data.modeStats.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLOURS[index % COLOURS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
                labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                itemStyle={{ color: 'hsl(var(--primary))' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h2 className='text-2xl font-semibold text-center mb-4'>
            By Work Arrangement
          </h2>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={data.arrangementStats}
                dataKey='count'
                nameKey='name'
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
              >
                {data.arrangementStats.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLOURS[index % COLOURS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
                labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                itemStyle={{ color: 'hsl(var(--primary))' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </>
  )
}
export default ChartsContainer
