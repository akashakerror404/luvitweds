import StatCard from '../Ui/StatCard'
import { STATS } from '../Constants/mockData'

export default function StatsGrid() {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))', gap:'16px', marginBottom:'28px' }}>
      {STATS.map((s, i) => (
        <StatCard key={s.label} {...s} delay={i * 0.08} />
      ))}
    </div>
  )
}