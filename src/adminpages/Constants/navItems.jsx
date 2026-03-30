export const NAV_ITEMS = [
  // Main Dashboard
  { id: 'dashboard', label: 'Dashboard', path: '/admin', icon: 'dashboard', description: 'Overview & Analytics' },
  
  // Bookings & Requests
  { id: 'bookings', label: 'Bookings', path: '/admin/bookings', icon: 'bookings', badge: 5, description: 'All confirmed bookings' },
  { id: 'client-requests', label: 'Client enquiry', path: '/admin/clinetrequestlist', icon: 'requests', badge: 3, description: 'New inquiries & leads' },
  
  // Client Management
  { id: 'clients', label: 'Clients', path: '/admin/clients', icon: 'clients', description: 'All client information' },
  
  // Portfolio & Gallery
  { id: 'portfolio', label: 'Portfolio', path: '/admin/portfolio', icon: 'portfolio', description: 'Manage photo galleries' },
  { id: 'albums', label: 'Albums', path: '/admin/albums', icon: 'album', description: 'Wedding albums & collections' },
  
  // Packages & Pricing
  { id: 'packages', label: 'Packages', path: '/admin/packages', icon: 'package', description: 'Wedding packages & pricing' },
  
  // Schedule & Calendar
  { id: 'availability', label: 'Availability', path: '/admin/availability', icon: 'available', description: 'Set available dates' },
  
  // Team Management
  { id: 'photographers', label: 'Photographers', path: '/admin/photographers', icon: 'team', description: 'Team members' },
  { id: 'assignments', label: 'Assignments', path: '/admin/assignments', icon: 'assignment', description: 'Shoot assignments' },
  
  // Revenue & Finance
  { id: 'payments', label: 'Payments', path: '/admin/payments', icon: 'payment', description: 'Invoices & transactions' },
  { id: 'revenue', label: 'Revenue', path: '/admin/revenue', icon: 'revenue', description: 'Income reports' },
  
  // Reviews & Testimonials
  { id: 'reviews', label: 'Reviews', path: '/admin/reviews', icon: 'review', badge: 12, description: 'Client testimonials' },
  
  // Marketing
  
  // Settings
  { id: 'settings', label: 'Settings', path: '/admin/settings', icon: 'settings', description: 'Site configuration' },
  { id: 'profile', label: 'Profile', path: '/admin/profile', icon: 'profile', description: 'Account settings' },
]