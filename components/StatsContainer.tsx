'use client'
import { useQuery } from '@tanstack/react-query'
import { getStatsAction } from '@/utils/actions'
import StatsCard from './StatsCard'

function StatsContainer() {
  const { data } = useQuery({
    queryKey: ['stats'],
    queryFn: () => getStatsAction(),
  })

  return (
    <div className='grid md:grid-cols-2 gap-4 lg:grid-cols-3'>
      <StatsCard title='applied' value={data?.applied || 0} />
      <StatsCard title='interview' value={data?.interview || 0} />
      <StatsCard title='offer' value={data?.offer || 0} />
      <StatsCard title='accepted' value={data?.accepted || 0} />
      <StatsCard title='declined' value={data?.declined || 0} />
      <StatsCard title='withdrawn' value={data?.withdrawn || 0} />
    </div>
  )
}
export default StatsContainer
