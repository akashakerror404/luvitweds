import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import HomeHeader from './Pages/Home/HomeHeader';
import Gallery from './Pages/Gallery/Gallery';
import Packages from './Pages/Packages/Packages';
import OurTeam from './Pages/OurTeam/OurTeam';
import About from './Pages/About/About';
import Navbar from './Pages/NavBar/Navbar';
import Chatboat from './Pages/chatboat/Chatboat';
import ClientRequestDetails from './Pages/clinetdeatils/ClinetRequestDetils';
import WeddingPage from './Pages/Invitationcard/WeddingPage';
import { Analytics } from "@vercel/analytics/react";
import AdminLayout from './adminpages/layout/AdminLayout';
import Dashboard from './adminpages/pages/Dashboard';
import Bookings from './adminpages/pages/Bookings';
import ClinetRequestList from './adminpages/pages/ClinetRequest/ClinetRequestList';
// import ClientRequestView from './adminpages/pages/ClinetRequest/ClinetRequestView';
import ClientRequestEdit from './adminpages/pages/ClinetRequest/ClinetRequestEdit';

// Maintenance Mode Component
const MaintenanceMode = () => {
  return (
    <div className="maintenance-container">
      <div className="maintenance-content">
        <div className="maintenance-icon">🎨</div>
        <h1 className="maintenance-title">Something Beautiful is Coming!</h1>
        <div className="maintenance-divider"></div>
        
        <p className="maintenance-message">
          We're giving our website a complete makeover to serve you better!
        </p>
        
        <div className="founder-message">
          <div className="founder-quote">"</div>
          <p className="founder-text">
            Dear valued customers, we're working on something extraordinary to make your 
            wedding planning experience even more magical. Thank you for your patience 
            and continued trust in us.
          </p>
          <div className="founder-signature">
            <strong>Akash</strong>
            <span>Founder & Creative Director</span>
          </div>
        </div>



        <div className="launch-info">
          <div className="launch-badge">
            <span className="blink-dot"></span>
            Launching Soon
          </div>
          <p className="contact-message">
            Have questions? I'm just a message away!
          </p>
          <a href="mailto:akash@luvit.com" className="maintenance-email">
            📧 akash@luvit.com
          </a>
        </div>

      
      </div>
    </div>
  );
};

function App() {
  const location = useLocation();

  // Check if current route is admin or wedding page
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isWeddingPage = location.pathname.startsWith('/luvit-wedding');
  
  // MAINTENANCE MODE FLAG - Set to false to disable maintenance mode
  const isMaintenanceMode = false;

  // If maintenance mode is enabled and not on wedding page, show maintenance message
  if (isMaintenanceMode && !isWeddingPage) {
    return (
      <div className="App">
        <MaintenanceMode />
        <Analytics />
      </div>
    );
  }

  // Hide Navbar and Chatboat for admin routes AND wedding routes
  const shouldHideNavbar = isAdminRoute || isWeddingPage;

  return (
    <div className="App">
      {/* Only show Navbar and Chatboat on non-admin, non-wedding routes */}
      {!shouldHideNavbar && <Navbar />}
      {!shouldHideNavbar && <Chatboat />}

      <Routes>
        <Route path="/" element={<HomeHeader />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/about" element={<About />} />
        <Route path="/client-request-details" element={<ClientRequestDetails />} />

        {/* Wedding page without Navbar */}
        <Route path="/luvit-wedding/:slug" element={<WeddingPage />} />

        {/* Admin routes - Navbar and Chatboat already hidden */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="clinetrequestlist" element={<ClinetRequestList />} />
          {/* <Route path="client-requests/view/:id" element={<ClientRequestView />} /> */}
          <Route path="client-requests/edit/:id" element={<ClientRequestEdit />} />
        </Route>
      </Routes>

      <Analytics />
    </div>
  );
}

export default App;