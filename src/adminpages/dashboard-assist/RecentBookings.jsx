import BookingsTable from './bookings/Table1'
import GoldButton from '../Ui/GoldButton'
import { BOOKINGS } from '../Constants/mockData'
import StatusBadge from '../Ui/StatusBadge'

export default function RecentBookings() {
  // Define columns configuration for recent bookings
  const columns = [
    { 
      key: 'id', 
      label: 'Booking ID', 
      render: (value) => (
        <span style={{ color: '#E8C547', fontWeight: 600, fontSize: '13px' }}>
          {value}
        </span>
      )
    },
    { 
      key: 'customer', 
      label: 'Customer',
      render: (value) => (
        <span style={{ fontSize: '13px', color: '#f0ece0' }}>
          {value}
        </span>
      )
    },
    { 
      key: 'service', 
      label: 'Service',
      render: (value) => (
        <span style={{ fontSize: '13px', color: 'rgba(240,236,224,0.7)' }}>
          {value}
        </span>
      )
    },
    { 
      key: 'amount', 
      label: 'Amount',
      render: (value) => (
        <span style={{ fontSize: '13px', color: '#4ADE80', fontWeight: 600 }}>
          {value}
        </span>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => <StatusBadge status={value} />
    }
  ]

  const handleViewAll = () => {
    console.log('View all bookings')
    // Navigate to bookings page or open modal
  }

  return (
    <div className="panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="panel-title" style={{ marginBottom: 0 }}>Recent Bookings</span>
        <GoldButton onClick={handleViewAll}>View All</GoldButton>
      </div>
      <BookingsTable rows={BOOKINGS.slice(0, 4)} columns={columns} />
    </div>
  )
}