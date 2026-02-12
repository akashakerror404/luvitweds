import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Clock, 
  Building, 
  Map, 
  Plus,
  X,
  Send,
  ChevronDown,
  Heart,
  Camera,
  Gift,
  Palette,
  Home,
  Sparkles,
  Briefcase,
  Baby,
  Cake,
  Diamond,
  Sun,
  Flower,
  Trees,
  Hash,
  CalendarDays
} from 'lucide-react';

const EVENT_TYPES = [
  { value: "Wedding", label: "Wedding", icon: Heart },
  { value: "PreWeddingSaveTheDate", label: "Save the Date", icon: CalendarDays },
  { value: "Haldi", label: "Haldi", icon: Sun },
  { value: "BrideShower", label: "Bride Shower", icon: Gift },
  { value: "Mehendi", label: "Mehendi", icon: Palette },
  { value: "Reception", label: "Reception", icon: Sparkles },
  { value: "OutdoorShoot", label: "Outdoor Shoot", icon: Trees },
  { value: "StudioShoot", label: "Studio Shoot", icon: Camera },
  { value: "Engagement", label: "Engagement", icon: Diamond },
  { value: "Birthday", label: "Birthday", icon: Cake },
  { value: "Maternity", label: "Maternity", icon: Baby },
  { value: "Other", label: "Other", icon: Hash },
];

function ClientRequestDetails() {
  const [formData, setFormData] = useState({
    client_name: '',
    mobile_number: '',
    alternate_number: '',
    email: '',
    city: '',
    status: 'Requested',
    events: [{ event_type: '', event_date: '', event_time: '', venue_name: '', venue_address: '' }]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEventChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEvents = [...formData.events];
    updatedEvents[index][name] = value;
    setFormData({
      ...formData,
      events: updatedEvents
    });
  };

  const addEvent = () => {
    setFormData({
      ...formData,
      events: [
        ...formData.events,
        { event_type: '', event_date: '', event_time: '', venue_name: '', venue_address: '' }
      ]
    });
  };

  const removeEvent = (index) => {
    if (formData.events.length > 1) {
      const updatedEvents = formData.events.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        events: updatedEvents
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage({ 
        type: 'success', 
        text: 'Your request has been sent! We\'ll contact you soon.' 
      });
      
      setFormData({
        client_name: '',
        mobile_number: '',
        alternate_number: '',
        email: '',
        city: '',
        status: 'Requested',
        events: [{ event_type: '', event_date: '', event_time: '', venue_name: '', venue_address: '' }]
      });

    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Something went wrong. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEventIcon = (eventType) => {
    const event = EVENT_TYPES.find(t => t.value === eventType);
    const IconComponent = event ? event.icon : Briefcase;
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 ">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#328E6E]"></div>
            <div className="w-1 h-1 rounded-full bg-[#328E6E]/40"></div>
            <div className="w-2 h-2 rounded-full bg-[#328E6E]"></div>
          </div>
          <h1 className="text-2xl font-light text-gray-800 mb-2">
            New Client Request
          </h1>
          <p className="text-gray-500 text-sm">
            Share details about your celebration
          </p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-3 rounded-lg text-center ${
            message.type === 'success' 
              ? 'bg-[#328E6E]/10 text-[#328E6E] border border-[#328E6E]/20' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Client Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-1">
              <User className="w-4 h-4 text-[#328E6E]" />
              <h2 className="text-base font-normal text-gray-800">Client Details</h2>
            </div>
            
            <div className="space-y-4">
              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleInputChange}
                  required
                  placeholder="Full name"
                  className="w-full bg-transparent border-b border-gray-200 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#328E6E] transition-colors text-sm"
                />
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mobile */}
                <div className="relative">
                  <input
                    type="tel"
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleInputChange}
                    required
                    placeholder="Mobile number"
                    className="w-full bg-transparent border-b border-gray-200 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#328E6E] transition-colors text-sm"
                  />
                </div>

                {/* Alternate Mobile */}
                <div className="relative">
                  <input
                    type="tel"
                    name="alternate_number"
                    value={formData.alternate_number}
                    onChange={handleInputChange}
                    placeholder="Alternate number (optional)"
                    className="w-full bg-transparent border-b border-gray-200 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#328E6E] transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Email & City Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Email address"
                    className="w-full bg-transparent border-b border-gray-200 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#328E6E] transition-colors text-sm"
                  />
                </div>

                {/* City */}
                <div className="relative">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="City"
                    className="w-full bg-transparent border-b border-gray-200 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#328E6E] transition-colors text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-1">
              <Calendar className="w-4 h-4 text-[#328E6E]" />
              <h2 className="text-base font-normal text-gray-800">Event Details</h2>
            </div>

            {formData.events.map((event, index) => (
              <div key={index} className="space-y-4 bg-white p-4 rounded-lg border border-gray-100">
                {/* Event Header */}
                <div className="flex items-center justify-between pb-2 border-b border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-[#328E6E]/10 flex items-center justify-center">
                      {getEventIcon(event.event_type)}
                    </div>
                    <span className="text-gray-600 text-sm">
                      Event {index + 1}
                    </span>
                  </div>
                  
                  {formData.events.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEvent(index)}
                      className="p-1 hover:bg-gray-50 rounded transition"
                      title="Remove event"
                    >
                      <X className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  )}
                </div>

                {/* Event Form */}
                <div className="space-y-4">
                  {/* Event Type */}
                  <div className="relative">
                    <div className="relative">
                      <select
                        name="event_type"
                        value={event.event_type}
                        onChange={(e) => handleEventChange(index, e)}
                        required
                        className="w-full appearance-none bg-transparent border-b border-gray-200 py-2 text-gray-800 focus:outline-none focus:border-[#328E6E] transition-colors cursor-pointer pr-8 text-sm"
                      >
                        <option value="" className="text-gray-400 text-sm">Select event type</option>
                        {EVENT_TYPES.map((type) => {
                          const Icon = type.icon;
                          return (
                            <option key={type.value} value={type.value} className="text-gray-800 text-sm">
                              {type.label}
                            </option>
                          );
                        })}
                      </select>
                      <div className="absolute right-1 top-2.5 pointer-events-none">
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Date & Time Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Date */}
                    <div className="relative">
                      <input
                        type="date"
                        name="event_date"
                        value={event.event_date}
                        onChange={(e) => handleEventChange(index, e)}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-transparent border-b border-gray-200 py-2 text-gray-800 focus:outline-none focus:border-[#328E6E] transition-colors text-sm"
                      />
                    </div>

                    {/* Time */}
                    <div className="relative">
                      <input
                        type="time"
                        name="event_time"
                        value={event.event_time}
                        onChange={(e) => handleEventChange(index, e)}
                        required
                        className="w-full bg-transparent border-b border-gray-200 py-2 text-gray-800 focus:outline-none focus:border-[#328E6E] transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Venue Details */}
                  <div className="space-y-4">
                    {/* Venue Name */}
                    <div className="relative">
                      <input
                        type="text"
                        name="venue_name"
                        value={event.venue_name}
                        onChange={(e) => handleEventChange(index, e)}
                        required
                        placeholder="Venue name"
                        className="w-full bg-transparent border-b border-gray-200 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#328E6E] transition-colors text-sm"
                      />
                    </div>

                    {/* Venue Address */}
                    <div className="relative">
                      <input
                        type="text"
                        name="venue_address"
                        value={event.venue_address}
                        onChange={(e) => handleEventChange(index, e)}
                        required
                        placeholder="Venue address"
                        className="w-full bg-transparent border-b border-gray-200 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#328E6E] transition-colors text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Event Button */}
            <button
              type="button"
              onClick={addEvent}
              className="w-full py-2.5 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#328E6E] hover:text-[#328E6E] transition-colors duration-200 group mt-2"
            >
              <div className="flex items-center justify-center gap-2">
                <Plus className="w-3.5 h-3.5" />
                <span className="text-sm font-normal">Add another event</span>
              </div>
            </button>
          </div>

          {/* Submit Section */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#328E6E] text-white rounded-lg hover:bg-[#2A7A5E] disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-normal">Submitting...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Send className="w-3.5 h-3.5" />
                  <span className="text-sm font-normal">Submit request</span>
                </div>
              )}
            </button>
            
            <p className="text-center text-gray-400 text-xs mt-2">
              We'll respond within 24 hours
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-[#328E6E]/20"></div>
            ))}
          </div>
          <p className="text-gray-400 text-xs">
           Luvit Weds • Since 2018
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClientRequestDetails;