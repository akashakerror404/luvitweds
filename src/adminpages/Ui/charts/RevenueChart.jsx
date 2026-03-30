const MONTHS = ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar']
const VALS   = [420, 510, 380, 620, 740, 580, 810, 690, 842]

export default function RevenueChart() {
  const max = Math.max(...VALS)
  const W = 420, H = 140, PAD = 30, barW = 30
  const gap = (W - PAD * 2 - barW * MONTHS.length) / (MONTHS.length - 1)

  return (
    <svg viewBox={`0 0 ${W} ${H + 30}`} style={{ width:'100%', overflow:'visible' }}>
      {VALS.map((v, i) => {
        const x = PAD + i * (barW + gap)
        const h = (v / max) * (H - 10)
        const y = H - h
        return (
          <g key={i}>
            <rect x={x} y={H} width={barW} height={0} rx="4"
              fill={i === VALS.length - 1 ? '#E8C547' : 'rgba(232,197,71,0.28)'}>
              <animate attributeName="height" from="0" to={h} dur={`${0.4 + i * 0.06}s`} fill="freeze" calcMode="spline" keySplines="0.2 0.8 0.4 1" />
              <animate attributeName="y"      from={H} to={y} dur={`${0.4 + i * 0.06}s`} fill="freeze" calcMode="spline" keySplines="0.2 0.8 0.4 1" />
            </rect>
            <text x={x + barW / 2} y={H + 18} textAnchor="middle"
              fill="rgba(240,236,224,0.35)" fontSize="10" fontFamily="Barlow Condensed">
              {MONTHS[i]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}