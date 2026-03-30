const DATA = [
  { label:'Confirmed',    val:42, color:'#4ADE80' },
  { label:'In Progress',  val:18, color:'#E8C547' },
  { label:'Completed',    val:28, color:'#60A5FA' },
  { label:'Pending',      val:12, color:'#F87171' },
]

export default function DonutChart() {
  const total = DATA.reduce((a, d) => a + d.val, 0)
  const R = 60, cx = 90, cy = 85, sw = 22
  let offset = -90

  return (
    <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
      <svg viewBox="0 0 180 175" style={{ width:'140px', flexShrink:0 }}>
        {DATA.map((d, i) => {
          const pct = d.val / total
          const deg = pct * 360
          const startRad = (offset * Math.PI) / 180
          const endRad   = ((offset + deg) * Math.PI) / 180
          const x1 = cx + R * Math.cos(startRad), y1 = cy + R * Math.sin(startRad)
          const x2 = cx + R * Math.cos(endRad),   y2 = cy + R * Math.sin(endRad)
          const path = `M ${x1} ${y1} A ${R} ${R} 0 ${deg > 180 ? 1 : 0} 1 ${x2} ${y2}`
          offset += deg
          return (
            <path key={i} d={path} fill="none" stroke={d.color} strokeWidth={sw} strokeLinecap="butt">
              <animate attributeName="stroke-dasharray"
                from={`0 ${2 * Math.PI * R}`} to={`${pct * 2 * Math.PI * R} ${2 * Math.PI * R}`}
                dur="1s" fill="freeze" />
            </path>
          )
        })}
        <text x={cx} y={cy - 8}  textAnchor="middle" fill="#f0ece0" fontSize="22" fontFamily="Bebas Neue" letterSpacing="2">{total}</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="rgba(240,236,224,0.35)" fontSize="9"  fontFamily="Barlow Condensed" letterSpacing="1">TOTAL</text>
      </svg>
      <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
        {DATA.map(d => (
          <div key={d.label} style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <span style={{ width:'8px', height:'8px', borderRadius:'2px', background:d.color, flexShrink:0 }} />
            <span style={{ fontSize:'11px', color:'rgba(240,236,224,0.55)', fontFamily:'Barlow Condensed', letterSpacing:'0.06em' }}>{d.label}</span>
            <span style={{ fontSize:'12px', color:'#f0ece0', fontFamily:'Bebas Neue', marginLeft:'auto', paddingLeft:'8px' }}>{d.val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}