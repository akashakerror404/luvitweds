import React, { useState } from 'react';
import { motion, } from 'framer-motion';
import { Plus, X, MapPin, Sparkles } from 'lucide-react';
import { useAddClientRequestMutation } from '../../store/api/ClientApi';

const EVENT_TYPES = [
  { value: "Wedding", label: "Wedding Ceremony" },
  { value: "Engagement", label: "Engagement" },
  { value: "PreWedding", label: "Pre-Wedding Shoot" },
  { value: "SaveTheDate", label: "Save The Date" },
  { value: "Haldi", label: "Haldi Ceremony" },
  { value: "Mehendi", label: "Mehendi Night" },
  { value: "Sangeet", label: "Sangeet Night" },
  { value: "Reception", label: "Grand Reception" },
  { value: "PostWedding", label: "Post-Wedding Shoot" },
  { value: "Maternity", label: "Maternity Narrative" },
  { value: "Newborn", label: "Newborn Series" },
  { value: "ModelShoot", label: "Editorial Portrait" },
  { value: "Corporate", label: "Corporate Event" },
  { value: "Other", label: "Other Celebration" },
];

function ClientRequestDetails() {
  const [addClientRequest, { isLoading: isApiLoading }] = useAddClientRequestMutation();
  
  const [formData, setFormData] = useState({
    client_name: '',
    mobile_number: '',
    email: '',
    city: '',
    events: [{ event_type: '', event_date: '', venue_name: '' }]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleEventChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEvents = [...formData.events];
    updatedEvents[index][name] = value;
    setFormData({ ...formData, events: updatedEvents });
    if (error) setError(null);
  };

  const addEvent = () => {
    setFormData({
      ...formData,
      events: [...formData.events, { event_type: '', event_date: '', venue_name: '' }]
    });
  };

  const removeEvent = (index) => {
    if (formData.events.length > 1) {
      setFormData({
        ...formData,
        events: formData.events.filter((_, i) => i !== index)
      });
    }
  };

  const validateForm = () => {
    // Check if all events have required fields
    for (let i = 0; i < formData.events.length; i++) {
      const event = formData.events[i];
      if (!event.event_type) {
        setError(`Please select event type for event ${i + 1}`);
        return false;
      }
      if (!event.event_date) {
        setError(`Please select event date for event ${i + 1}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      // Prepare data for API
      const requestData = {
        client_name: formData.client_name,
        mobile_number: formData.mobile_number,
        email: formData.email,
        city: formData.city,
        events: formData.events.map(event => ({
          event_type: event.event_type,
          event_date: event.event_date,
          venue_name: event.venue_name || ""
        })),
        source: "Website Inquiry",
        notes: ""
      };

      // Call API
      const response = await addClientRequest(requestData).unwrap();
      
      console.log('API Response:', response);
      
      // Show success message
      setIsSubmitting(false);
      setSubmitted(true);
      
    } catch (err) {
      console.error('API Error:', err);
      
      // Handle validation errors from backend
      if (err.data?.errors) {
        const errorMessages = Object.values(err.data.errors).flat();
        setError(errorMessages.join(', '));
      } else {
        setError(err.data?.message || 'Failed to submit request. Please try again.');
      }
      
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f0e9e0] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <Sparkles className="w-12 h-12 text-[#8ba88e] mx-auto mb-8 animate-pulse" />
          <h2 className="text-5xl md:text-7xl font-playfair italic mb-6 text-[#2d2d2d]">Thank You</h2>
          <p className="font-montserrat text-[10px] tracking-[0.5em] uppercase text-gray-500">
            Your narrative has been shared. Our team will reach out shortly.
          </p>
          <button 
            onClick={() => {
              setSubmitted(false);
              setFormData({
                client_name: '',
                mobile_number: '',
                email: '',
                city: '',
                events: [{ event_type: '', event_date: '', venue_name: '' }]
              });
            }} 
            className="mt-12 text-[10px] tracking-[0.3em] uppercase border-b border-black pb-1 hover:text-[#8ba88e] transition-colors"
          >
            Back to Form
          </button>
        </motion.div>
      </div>
    );
  }

  const isLoading = isSubmitting || isApiLoading;

  return (
    <div className="min-h-screen bg-[#f0e9e0] text-[#2d2d2d] pt-32 pb-24 selection:bg-[#8ba88e] selection:text-white">
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* --- EDITORIAL HEADER --- */}
        <header className="mb-24">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[10px] tracking-[0.5em] uppercase text-[#8ba88e] font-montserrat font-bold block mb-4"
          >
            Inquiry Collective
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-playfair leading-[0.85] italic lowercase"
          >
            build your <br />
            <span className="not-italic ml-12 md:ml-24">itinerary</span>
          </motion.h1>
          <div className="h-[1px] bg-black/5 w-full mt-16" />
        </header>

        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <p className="text-red-600 text-sm text-center">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-32">
          
          {/* SECTION 1: PERSONAL DETAILS */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
               <span className="text-[10px] font-montserrat opacity-30 tracking-tighter block mb-2">01</span>
               <h2 className="text-3xl font-playfair italic text-gray-400">Client Info</h2>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
              <div className="space-y-1 group">
                <label className="text-[9px] tracking-[0.3em] uppercase text-gray-400 font-bold group-focus-within:text-[#8ba88e] transition-colors">Full Name</label>
                <input
                  type="text"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleInputChange}
                  required
                  placeholder="The Couple / Client Name"
                  className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-[#8ba88e] transition-colors font-playfair text-xl placeholder:text-gray-300"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] tracking-[0.3em] uppercase text-gray-400 font-bold">Contact Number</label>
                <input
                  type="tel"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-[#8ba88e] transition-colors font-playfair text-xl"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] tracking-[0.3em] uppercase text-gray-400 font-bold">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-[#8ba88e] transition-colors font-playfair text-xl"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] tracking-[0.3em] uppercase text-gray-400 font-bold">Base Location</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Calicut"
                  className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-[#8ba88e] transition-colors font-playfair text-xl placeholder:text-gray-300"
                />
              </div>
            </div>
          </section>

          {/* SECTION 2: EVENT COLLECTIVE */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
               <span className="text-[10px] font-montserrat opacity-30 tracking-tighter block mb-2">02</span>
               <h2 className="text-3xl font-playfair italic text-gray-400">The Events</h2>
               <p className="text-[11px] text-gray-400 mt-4 leading-relaxed uppercase tracking-widest font-montserrat italic">
                 Select all ceremonies you wish to document.
               </p>
            </div>

            <div className="lg:col-span-8 space-y-10">
              {formData.events.map((event, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="relative p-10 border border-black/5 bg-white shadow-sm rounded-sm"
                >
                  {formData.events.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEvent(index)}
                      className="absolute top-6 right-6 text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-1">
                      <label className="text-[9px] tracking-[0.3em] uppercase text-gray-400 font-bold">Nature of Event</label>
                      <select
                        name="event_type"
                        value={event.event_type}
                        onChange={(e) => handleEventChange(index, e)}
                        required
                        className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none font-playfair text-lg cursor-pointer"
                      >
                        <option value="">Select Event Type</option>
                        {EVENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] tracking-[0.3em] uppercase text-gray-400 font-bold">Date</label>
                      <input
                        type="date"
                        name="event_date"
                        value={event.event_date}
                        onChange={(e) => handleEventChange(index, e)}
                        required
                        className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none font-playfair text-lg"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[9px] tracking-[0.3em] uppercase text-gray-400 font-bold">Venue / Destination</label>
                      <div className="flex items-center gap-3 border-b border-black/10 focus-within:border-[#8ba88e] transition-colors">
                        <MapPin className="w-4 h-4 text-gray-300" />
                        <input
                          type="text"
                          name="venue_name"
                          value={event.venue_name}
                          onChange={(e) => handleEventChange(index, e)}
                          placeholder="e.g. Le Méridien, Kochi"
                          className="w-full bg-transparent py-3 focus:outline-none font-playfair text-lg placeholder:text-gray-200"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <button
                type="button"
                onClick={addEvent}
                className="flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase text-[#8ba88e] hover:text-[#2d2d2d] transition-all group font-bold"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform p-1 border border-[#8ba88e] rounded-full" />
                Add Event
              </button>
            </div>
          </section>

          {/* FINAL SUBMIT ACTION */}
          <div className="pt-20 flex flex-col items-center">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full md:w-auto px-24 py-7 overflow-hidden border border-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className={`relative z-10 text-[10px] tracking-[0.8em] uppercase transition-colors duration-500 ${isLoading ? 'text-white' : 'group-hover:text-white'}`}>
                {isLoading ? 'Documenting...' : 'Submit Inquiry'}
              </span>
              <motion.div 
                initial={false}
                animate={isLoading ? { y: 0 } : { y: "100%" }}
                className="absolute inset-0 bg-[#2d2d2d]"
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-[#2d2d2d] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
            <p className="mt-8 text-[9px] tracking-[0.4em] text-gray-300 uppercase font-montserrat">
              Kerala • Dubai • Available Worldwide
            </p>
          </div>
        </form>

        <footer className="mt-48 pt-10 border-t border-black/[0.03] text-center">
           <h3 className="font-playfair italic text-xl opacity-20 mb-2">Luvit Weds</h3>
           <p className="text-[8px] tracking-[0.2em] uppercase text-gray-300">© 2026 Crafted by Miraq Technology</p>
        </footer>
      </div>
    </div>
  );
}

export default ClientRequestDetails;