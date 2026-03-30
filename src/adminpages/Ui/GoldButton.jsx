export default function GoldButton({ children, onClick, style }) {
  return (
    <button onClick={onClick} className="gold-btn-sm" style={style}>
      {children}
    </button>
  )
}