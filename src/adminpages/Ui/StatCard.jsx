import Icon, { ICONS } from './Icon'

export default function StatCard({ label, value, delta, up, icon, color, delay = 0 }) {
  return (
    <div className="stat-card" style={{ animationDelay: `${delay}s` }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'14px' }}>
        <div style={{ padding:'8px', borderRadius:'8px', background:`${color}18`, color }}>
          <Icon d={ICONS[icon]} size={18} />
        </div>
        <span style={{
          fontSize:'11px', fontWeight:600, letterSpacing:'0.06em',
          color: up ? '#4ADE80' : '#F87171',
          background: up ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)',
          padding:'3px 8px', borderRadius:'20px'
        }}>{delta}</span>
      </div>
      <div style={{ fontSize:'24px', fontFamily:"'Bebas Neue',sans-serif", color:'#f0ece0', letterSpacing:'0.06em', marginBottom:'4px' }}>
        {value}
      </div>
      <div style={{ fontSize:'11px', color:'rgba(240,236,224,0.4)', letterSpacing:'0.08em', textTransform:'uppercase' }}>
        {label}
      </div>
    </div>
  )
}