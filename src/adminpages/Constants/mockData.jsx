export const STATS = [
  { label: 'Total Revenue',   value: '₹8,42,500', delta: '+12.4%', up: true,  icon: 'dollar',   color: '#E8C547' },
  { label: 'Active Bookings', value: '124',        delta: '+8',     up: true,  icon: 'bookings', color: '#4ADE80' },
  { label: 'Vehicles Active', value: '38 / 50',   delta: '76%',    up: true,  icon: 'car',      color: '#60A5FA' },
  { label: 'Pending Service', value: '17',         delta: '-3',     up: false, icon: 'services', color: '#F87171' },
]

export const BOOKINGS = [
  { id:'BK-1041', customer:'Arjun Menon',  service:'Full Detailing',   vehicle:'Toyota Innova',  status:'Confirmed',   time:'10:00 AM', amount:'₹3,200' },
  { id:'BK-1040', customer:'Priya Nair',   service:'Engine Checkup',   vehicle:'Honda City',     status:'In Progress', time:'09:15 AM', amount:'₹1,800' },
  { id:'BK-1039', customer:'Suresh Kumar', service:'Oil Change',       vehicle:'Maruti Swift',   status:'Completed',   time:'08:30 AM', amount:'₹650'   },
  { id:'BK-1038', customer:'Divya Raj',    service:'Tyre Replacement', vehicle:'Hyundai Creta',  status:'Pending',     time:'Yesterday',amount:'₹4,500' },
  { id:'BK-1037', customer:'Rahul Varma',  service:'AC Service',       vehicle:'Kia Seltos',     status:'Confirmed',   time:'Yesterday',amount:'₹2,100' },
  { id:'BK-1036', customer:'Meena Thomas', service:'Brake Inspection', vehicle:'Ford EcoSport',  status:'Completed',   time:'2 days ago',amount:'₹900' },
]

export const SERVICES = [
  { name:'Full Car Detailing', duration:'4 hrs',   price:'₹3,200', count:42, color:'#E8C547' },
  { name:'Engine Checkup',     duration:'2 hrs',   price:'₹1,800', count:38, color:'#60A5FA' },
  { name:'Oil Change',         duration:'45 min',  price:'₹650',   count:91, color:'#4ADE80' },
  { name:'AC Service & Regas', duration:'3 hrs',   price:'₹2,100', count:29, color:'#F87171' },
  { name:'Tyre Rotation',      duration:'1 hr',    price:'₹800',   count:55, color:'#A78BFA' },
  { name:'Brake Inspection',   duration:'1.5 hrs', price:'₹900',   count:34, color:'#FB923C' },
]