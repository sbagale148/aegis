interface StatsCardProps {
  title: string
  value: string
  description: string
  variant?: 'events' | 'projects' | 'secretTypes'
}

export default function StatsCard({ title, value, description, variant = 'events' }: StatsCardProps) {
  const variants = {
    events: {
      icon: '🛡️',
      iconBg: 'bg-rose-50',
      pillBg: 'bg-rose-50',
      ring: 'ring-rose-100',
      iconText: 'text-rose-600',
    },
    projects: {
      icon: '📂',
      iconBg: 'bg-indigo-50',
      pillBg: 'bg-indigo-50',
      ring: 'ring-indigo-100',
      iconText: 'text-indigo-600',
    },
    secretTypes: {
      icon: '🔐',
      iconBg: 'bg-amber-50',
      pillBg: 'bg-amber-50',
      ring: 'ring-amber-100',
      iconText: 'text-amber-600',
    },
  } as const

  const style = variants[variant]

  return (
    <div className={`bg-white overflow-hidden shadow rounded-lg border border-gray-100 ${style.ring}`}>
      <div className="p-5">
        <div className="flex items-center">
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-base font-bold ${style.iconBg} ${style.iconText}`}
          >
            <span aria-hidden="true" className="leading-none">
              {style.icon}
            </span>
          </div>
          <div className="ml-4 flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-medium text-gray-600 truncate">{title}</span>
              <span className="text-2xl font-semibold text-gray-900 whitespace-nowrap">{value}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500 truncate">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}


