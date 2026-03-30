import GoldButton from '../../Ui/GoldButton'
import Icon, { ICONS } from '../../Ui/Icon'

export default function Filters({ 
  active, 
  onChange, 
  filters = ['All', 'Confirmed', 'In Progress', 'Completed', 'Pending'],
  showNewButton = true,
  onNewBooking,
  buttonText = 'New Booking'
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-5">
      {filters.map(s => (
        <button 
          key={s} 
          onClick={() => onChange(s)} 
          className={`
            px-4 py-1.5 rounded-full text-sm font-medium tracking-wide transition-all duration-200
            ${active === s 
              ? 'bg-amber-600 text-white shadow-md' 
              : 'bg-gray-200/70 text-gray-700 hover:bg-gray-300/80'
            }
          `}
        >
          {s}
        </button>
      ))}
      {showNewButton && (
        <div className="ml-auto">
          <GoldButton onClick={onNewBooking} className="flex items-center gap-1">
            <Icon d={ICONS.plus} size={14} /> 
            <span>{buttonText}</span>
          </GoldButton>
        </div>
      )}
    </div>
  )
}