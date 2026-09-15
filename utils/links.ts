import { Layers, AppWindow, AreaChart } from 'lucide-react'

type Link = {
  href: string
  label: string
  icon: React.ElementType
}

const links: Link[] = [
  { href: '/add-job', label: 'add job', icon: Layers },
  { href: '/jobs', label: 'all jobs', icon: AppWindow },
  { href: '/stats', label: 'stats', icon: AreaChart },
]

export default links
