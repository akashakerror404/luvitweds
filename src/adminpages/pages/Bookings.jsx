import { useState } from 'react'
import { BOOKINGS } from '../Constants/mockData'
import Filters from '../dashboard-assist/bookings/Filters'
import Table1 from '../dashboard-assist/bookings/Table1'
import StatusBadge from '../Ui/StatusBadge'

export default function Bookings() {
  const [filter, setFilter] = useState('All')
  const rows = filter === 'All' ? BOOKINGS : BOOKINGS.filter(b => b.status === filter)

  // Define dummy columns configuration
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
      key: 'vehicle', 
      label: 'Vehicle',
      render: (value) => (
        <span style={{ fontSize: '13px', color: 'rgba(240,236,224,0.5)' }}>
          {value}
        </span>
      )
    },
    { 
      key: 'time', 
      label: 'Time',
      render: (value) => (
        <span style={{ fontSize: '12px', color: 'rgba(240,236,224,0.4)' }}>
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

  const filters = ['All', 'Confirmed', 'In Progress', 'Completed', 'Pending']

  const handleNewBooking = () => {
    console.log('Create new booking')
  }

  return (
    <div className='h-screen'>
      <Filters 
        active={filter} 
        onChange={setFilter}
        filters={filters}
        showNewButton={true}
        onNewBooking={handleNewBooking}
        buttonText="New Booking"
      />
      <div className="panel">
        <Table1 rows={rows} columns={columns} />
      </div>
    </div>
  )
}