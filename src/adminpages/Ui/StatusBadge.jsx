import { STATUS_STYLES } from '../Constants/statusStyles'

export default function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || {}
  return (
    <span style={{
      ...s, padding: '3px 10px', borderRadius: '20px',
      fontSize: '11px', fontWeight: 600, letterSpacing: '0.07em',
      display: 'inline-flex', alignItems: 'center', gap: '5px'
    }}>
      <span style={{ width:'5px', height:'5px', borderRadius:'50%', background: s.dot, display:'inline-block' }} />
      {status}
    </span>
  )
}