export default function LoadingBar({ loading }) {
  return (
    <div style={{ position:'fixed', top:0, left:0, right:0, height:'3px', zIndex:9999, pointerEvents:'none' }}>
      <div style={{
        height: '100%',
        background: 'linear-gradient(90deg,#C9973A,#E8C547,#C9973A)',
        width:   loading ? '75%' : '0%',
        opacity: loading ? 1 : 0,
        transition: loading ? 'width 0.6s ease' : 'width 0.3s ease, opacity 0.4s 0.3s ease',
        boxShadow: '0 0 12px rgba(232,197,71,0.6)',
      }} />
    </div>
  )
}