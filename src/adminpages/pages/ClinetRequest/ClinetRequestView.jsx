import { useNavigate, useParams } from 'react-router-dom';
import { useGetClientRequestByIdQuery } from '../../../store/api/ClientApi';
import StatusBadge from '../../Ui/StatusBadge';
import { ArrowLeft, Edit3, User, Calendar, MapPin, Globe, Clock, FileText } from 'lucide-react';

export default function ClientRequestView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: apiResponse, isLoading, isError, error } = useGetClientRequestByIdQuery(id);
  
  const request = apiResponse?.data;

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState message={error?.data?.message} />;
  if (!request) return <div style={{ textAlign: 'center', padding: '80px 20px', color: '#9E9E9E', backgroundColor: '#0A0A0A', minHeight: '100vh' }}>Request not found</div>;

  return (
    <div style={{ 
      padding: '30px', 
      maxWidth: '1000px', 
      margin: '0 auto', 
      fontFamily: "'Barlow', sans-serif",
      color: '#E0E0E0',
      backgroundColor: '#0A0A0A',
      minHeight: '100vh'
    }}>
      
      {/* Top Navigation Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <button 
          onClick={() => navigate('/admin/clinetrequestlist')}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#9E9E9E', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            cursor: 'pointer', 
            fontSize: '14px',
            transition: 'all 0.2s ease',
            padding: '8px 12px',
            borderRadius: '6px'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#FFD700';
            e.target.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#9E9E9E';
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
        
        <button
          onClick={() => navigate(`/admin/client-requests/edit/${request.id}`)}
          style={{ 
            background: '#FFD700', 
            color: '#000000', 
            padding: '10px 20px', 
            borderRadius: '8px', 
            border: 'none', 
            fontWeight: '600', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#FFED4A';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#FFD700';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <Edit3 size={16} /> Edit Details
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
        
        {/* LEFT COLUMN: PRIMARY INFO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Main Identity Card */}
          <section style={cardStyle}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: '#0F0F0F', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#FFD700', 
                border: '1px solid #2A2A2A' 
              }}>
                <User size={30} />
              </div>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px', color: '#E0E0E0' }}>{request.client_name}</h1>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <StatusBadge status={request.status} />
                  <span style={{ color: '#9E9E9E', fontSize: '13px' }}>ID: {request.request_id || request.id}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderTop: '1px solid #2A2A2A', paddingTop: '20px' }}>
              <InfoBlock icon={<Globe size={16}/>} label="Source" value={request.source || 'Direct Inquiry'} />
              <InfoBlock icon={<MapPin size={16}/>} label="Location" value={request.city || 'N/A'} />
              <InfoBlock icon={<FileText size={16}/>} label="Email" value={request.email || 'N/A'} />
              <InfoBlock icon={<Clock size={16}/>} label="Phone" value={request.mobile_number || 'N/A'} />
            </div>
          </section>

          {/* Notes Section */}
          <section style={cardStyle}>
            <h3 style={{ fontSize: '14px', color: '#FFD700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', fontWeight: '600' }}>Request Notes</h3>
            <p style={{ color: '#B0B0B0', lineHeight: '1.6', fontSize: '15px', fontStyle: request.notes ? 'normal' : 'italic' }}>
              {request.notes || 'No specific notes provided for this client request.'}
            </p>
          </section>

          {/* Events Table */}
          {request.events?.length > 0 && (
            <section style={{ ...cardStyle, padding: '0' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #2A2A2A' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#E0E0E0' }}>Scheduled Events</h3>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ background: '#0F0F0F' }}>
                    <tr>
                      <th style={tableHeadStyle}>Event Type</th>
                      <th style={tableHeadStyle}>Date</th>
                      <th style={tableHeadStyle}>Venue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {request.events.map((event, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #2A2A2A' }}>
                        <td style={tableCellStyle}>{event.event_type || 'N/A'}</td>
                        <td style={tableCellStyle}>{event.event_date ? new Date(event.event_date).toLocaleDateString() : 'N/A'}</td>
                        <td style={tableCellStyle}>{event.venue_name || 'TBD'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN: METADATA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section style={{ ...cardStyle, background: '#0F0F0F' }}>
            <h3 style={{ fontSize: '13px', color: '#9E9E9E', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>HISTORY</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={miniLabel}>Created On</label>
                <div style={{ fontSize: '13px', color: '#E0E0E0' }}>
                  {request.created_at ? new Date(request.created_at).toLocaleString() : 'N/A'}
                </div>
              </div>
              <div>
                <label style={miniLabel}>Last Modified</label>
                <div style={{ fontSize: '13px', color: '#E0E0E0' }}>
                  {request.updated_at ? new Date(request.updated_at).toLocaleString() : 'N/A'}
                </div>
              </div>
            </div>
          </section>

          <div style={{ 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px dashed #2A2A2A', 
            textAlign: 'center',
            backgroundColor: '#1A1A1A'
          }}>
            <p style={{ fontSize: '12px', color: '#9E9E9E' }}>
              This request was generated via the public inquiry form.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

// UI SUB-COMPONENTS
function InfoBlock({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
      <div style={{ color: '#FFD700', marginTop: '2px' }}>{icon}</div>
      <div>
        <label style={miniLabel}>{label}</label>
        <div style={{ fontSize: '14px', color: '#B0B0B0' }}>{value || 'N/A'}</div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      color: '#FFD700',
      backgroundColor: '#0A0A0A',
      fontSize: '14px'
    }}>
      Fetching Request Details...
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div style={{ 
      color: '#F44336', 
      textAlign: 'center', 
      padding: '80px 20px',
      backgroundColor: '#0A0A0A',
      minHeight: '100vh'
    }}>
      {message || 'Error loading data'}
    </div>
  );
}

// SHARED STYLES
const cardStyle = {
  background: '#1A1A1A',
  border: '1px solid #2A2A2A',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
};

const miniLabel = {
  display: 'block',
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: '#9E9E9E',
  marginBottom: '4px',
  fontWeight: '600'
};

const tableHeadStyle = {
  textAlign: 'left',
  padding: '12px 24px',
  fontSize: '11px',
  color: '#9E9E9E',
  textTransform: 'uppercase',
  fontWeight: '600',
  letterSpacing: '0.5px'
};

const tableCellStyle = {
  padding: '16px 24px',
  fontSize: '13px',
  color: '#B0B0B0'
};