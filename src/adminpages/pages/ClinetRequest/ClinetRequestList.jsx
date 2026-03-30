import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetAllClientRequestsQuery } from '../../../store/api/ClientApi'
import StatusBadge from '../../Ui/StatusBadge'
import Filters from '../../dashboard-assist/bookings/Filters'
import Table1 from '../../dashboard-assist/bookings/Table1'

export default function ClinetRequestList() {
  const [filter, setFilter] = useState('All')
  const navigate = useNavigate()
  
  // Fetch data from API
  const { data: apiResponse, isLoading, isError, error } = useGetAllClientRequestsQuery()
  
  // FIXED: Wrap 'bookings' in useMemo so it has a stable reference
  const bookings = useMemo(() => apiResponse?.data || [], [apiResponse])
  
  // Get unique statuses from API data for filters
  const filters = useMemo(() => {
    if (!bookings || bookings.length === 0) return ['All']
    
    const uniqueStatuses = [...new Set(bookings.map(booking => booking.status))]
    return ['All', ...uniqueStatuses]
  }, [bookings])
  
  // Filter rows based on selected status
  const rows = useMemo(() => {
    if (!bookings || bookings.length === 0) return []
    if (filter === 'All') return bookings
    return bookings.filter(booking => booking.status === filter)
  }, [bookings, filter])
  
  // Action handlers with navigation
  const handleView = (request) => {
    console.log('View clicked:', request)
    navigate(`/admin/client-requests/view/${request.id}`, { 
      state: { requestData: request } 
    })
  }

  const handleEdit = (request) => {
    console.log('Edit clicked:', request)
    navigate(`/admin/client-requests/edit/${request.id}`, { 
      state: { requestData: request } 
    })
  }

  const handleDelete = (request) => {
    console.log('Delete clicked:', request)
    if (window.confirm('Are you sure you want to delete this request?')) {
      navigate(`/client-requests/delete/${request.id}`, { 
        state: { requestData: request } 
      })
    }
  }
  
  // FIXED: Wrap columns in useMemo to prevent unnecessary table re-renders
  const columns = useMemo(() => [
    { 
      key: 'client_name', 
      label: 'Client Name',
      render: (value) => (
        <span style={{ fontSize: '13px', color: '#E0E0E0', fontWeight: '500' }}>
          {value || 'N/A'}
        </span>
      )
    },
    { 
      key: 'mobile_number', 
      label: 'Mobile Number',
      render: (value) => (
        <span style={{ fontSize: '13px', color: '#B0B0B0' }}>
          {value || 'N/A'}
        </span>
      )
    },
    { 
      key: 'email', 
      label: 'Email',
      render: (value) => (
        <span style={{ fontSize: '13px', color: '#9E9E9E' }}>
          {value || 'N/A'}
        </span>
      )
    },
    { 
      key: 'city', 
      label: 'City',
      render: (value) => (
        <span style={{ fontSize: '12px', color: '#8A8A8A' }}>
          {value || 'N/A'}
        </span>
      )
    },
    { 
      key: 'created_at', 
      label: 'Created Date',
      render: (value) => (
        <span style={{ fontSize: '12px', color: '#8A8A8A' }}>
          {value ? new Date(value).toLocaleDateString() : 'N/A'}
        </span>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => <StatusBadge status={value} />
    }
  ], [])

  const handleNewBooking = () => {
    console.log('New Request clicked')
    navigate('/client-requests/new')
  }

  // Loading state
  if (isLoading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#0A0A0A'
      }}>
        <div style={{ color: '#FFD700', fontSize: '14px' }}>Loading requests...</div>
      </div>
    )
  }

  // Error state
  if (isError) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#0A0A0A'
      }}>
        <div style={{ color: '#F44336', fontSize: '14px' }}>
          Error loading requests: {error?.message || 'Please try again later'}
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0A0A0A',
      padding: '20px'
    }}>
      <Filters 
        active={filter} 
        onChange={setFilter}
        filters={filters}
        showNewButton={true}
        onNewBooking={handleNewBooking}
        buttonText="New Request"
      />
      <div style={{
        backgroundColor: '#1A1A1A',
        borderRadius: '12px',
        border: '1px solid #2A2A2A',
        overflow: 'hidden',
        marginTop: '20px'
      }}>
        <Table1 
          rows={rows}
          columns={columns}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          showView={true}
          showEdit={true}
          showDelete={true}
        />
      </div>
    </div>
  )
}