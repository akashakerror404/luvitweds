import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetClientRequestByIdQuery, useUpdateClientRequestMutation } from '../../../store/api/ClientApi';

export default function ClientRequestEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: apiResponse, isLoading } = useGetClientRequestByIdQuery(id);
  const [updateRequest, { isLoading: isUpdating }] = useUpdateClientRequestMutation();
  
  const [formData, setFormData] = useState({
    client_name: '',
    mobile_number: '',
    email: '',
    city: '',
    status: 'Pending',
    source: '',
    notes: ''
  });

  // Local state for backend validation errors
  const [serverErrors, setServerErrors] = useState({});

  useEffect(() => {
    if (apiResponse?.data) {
      const request = apiResponse.data;
      setFormData({
        client_name: request.client_name || '',
        mobile_number: request.mobile_number || '',
        email: request.email || '',
        city: request.city || '',
        status: request.status || 'Pending',
        source: request.source || '',
        notes: request.notes || ''
      });
    }
  }, [apiResponse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear the error for this field as the user types
    if (serverErrors[name]) {
      setServerErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerErrors({}); // Reset errors before submission

    try {
      await updateRequest({ id, ...formData }).unwrap();
      alert('Request updated successfully!');
      navigate('/admin/clinetrequestlist');
    } catch (err) {
      // Check if the error matches your JSON structure
      if (err?.data?.errors) {
        setServerErrors(err.data.errors);
      } else {
        alert(err?.data?.message || 'An unexpected error occurred');
      }
    }
  };

  if (isLoading) return <div style={{ padding: '40px', color: '#FFD700', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ 
      padding: '30px', 
      maxWidth: '900px', 
      margin: '0 auto', 
      fontFamily: "'Barlow', sans-serif", 
      color: '#E0E0E0',
      backgroundColor: '#0A0A0A',
      minHeight: '100vh'
    }}>
      
      <div style={{ marginBottom: '30px', borderBottom: '1px solid #2A2A2A', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#FFD700' }}>Edit Client Request</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
          
          <div style={{ 
            background: '#1A1A1A', 
            border: '1px solid #2A2A2A',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex', 
            flexDirection: 'column', 
            gap: '20px' 
          }}>
            <h3 style={{ color: '#FFD700', fontSize: '16px', fontWeight: '600' }}>Client Details</h3>
            
            <FormField 
              label="Full Name" 
              name="client_name" 
              value={formData.client_name} 
              onChange={handleChange}
              error={serverErrors.client_name} 
            />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <FormField 
                label="Mobile Number" 
                name="mobile_number" 
                value={formData.mobile_number} 
                onChange={handleChange}
                error={serverErrors.mobile_number}
              />
              <FormField 
                label="Email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                error={serverErrors.email}
              />
            </div>

            <FormField label="City" name="city" value={formData.city} onChange={handleChange} error={serverErrors.city} />
            <FormField label="Lead Source" name="source" value={formData.source} onChange={handleChange} />

            <div>
              <label style={labelStyle}>Internal Notes</label>
              <textarea 
                name="notes" 
                value={formData.notes} 
                onChange={handleChange} 
                style={inputStyle} 
                rows="4"
                placeholder="Add internal notes here..."
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#1A1A1A', padding: '20px', borderRadius: '12px', border: '1px solid #2A2A2A' }}>
              <label style={{ ...labelStyle, color: '#FFD700' }}>Current Status</label>
              <select name="status" value={formData.status} onChange={handleChange} style={inputStyle}>
                {['Pending', 'Converted', 'Cancelled', 'In Progress'].map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '12px', 
          marginTop: '20px', 
          borderTop: '1px solid #2A2A2A', 
          paddingTop: '20px' 
        }}>
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            style={cancelBtnStyle}
            onMouseEnter={(e) => {
              e.target.style.background = '#2A2A2A';
              e.target.style.borderColor = '#FFD700';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.borderColor = '#2A2A2A';
            }}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isUpdating} 
            style={saveBtnStyle}
            onMouseEnter={(e) => {
              if (!isUpdating) {
                e.target.style.background = '#FFED4A';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isUpdating) {
                e.target.style.background = '#FFD700';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {isUpdating ? 'Saving...' : 'Update Request'}
          </button>
        </div>
      </form>
    </div>
  );
}

/* Helper for Individual Fields with Error Message */
function FormField({ label, name, value, onChange, error, type = "text" }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label style={labelStyle}>{label}</label>
      <input 
        type={type}
        name={name} 
        value={value} 
        onChange={onChange} 
        style={{ 
          ...inputStyle, 
          borderColor: error ? '#F44336' : '#2A2A2A',
          transition: 'all 0.2s ease'
        }}
        onFocus={(e) => {
          if (!error) {
            e.target.style.borderColor = '#FFD700';
            e.target.style.boxShadow = '0 0 0 2px rgba(255, 215, 0, 0.1)';
          }
        }}
        onBlur={(e) => {
          if (!error) {
            e.target.style.borderColor = '#2A2A2A';
            e.target.style.boxShadow = 'none';
          }
        }}
      />
      {error && (
        <span style={{ color: '#F44336', fontSize: '11px', marginTop: '2px' }}>
          {Array.isArray(error) ? error[0] : error}
        </span>
      )}
    </div>
  );
}

/* Base Styles - Dark Theme */
const labelStyle = { 
  display: 'block', 
  fontSize: '11px', 
  textTransform: 'uppercase', 
  color: '#9E9E9E', 
  fontWeight: '600',
  letterSpacing: '0.5px'
};

const inputStyle = { 
  width: '100%', 
  padding: '10px 12px', 
  background: '#0F0F0F', 
  border: '1px solid #2A2A2A', 
  borderRadius: '6px', 
  color: '#E0E0E0', 
  fontSize: '14px', 
  outline: 'none',
  transition: 'all 0.2s ease',
  fontFamily: "'Barlow', sans-serif"
};

const cancelBtnStyle = { 
  padding: '10px 24px', 
  background: 'transparent', 
  border: '1px solid #2A2A2A', 
  color: '#E0E0E0', 
  cursor: 'pointer', 
  borderRadius: '6px',
  transition: 'all 0.2s ease',
  fontFamily: "'Barlow', sans-serif",
  fontWeight: '500'
};

const saveBtnStyle = { 
  padding: '10px 24px', 
  background: '#FFD700', 
  border: 'none', 
  color: '#000000', 
  fontWeight: '600', 
  cursor: 'pointer', 
  borderRadius: '6px',
  transition: 'all 0.2s ease',
  fontFamily: "'Barlow', sans-serif"
};