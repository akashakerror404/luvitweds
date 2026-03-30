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
import ClientRequestView from './adminpages/pages/ClinetRequest/ClinetRequestView';
import ClientRequestEdit from './adminpages/pages/ClinetRequest/ClinetRequestEdit';
import EngagementPage from './Pages/Invitationcard/EngagementPage';

function App() {
  const location = useLocation();

  // Check if current route is admin or wedding page
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isWeddingPage = location.pathname.startsWith('/luvit-wedding');
    const isEngePage = location.pathname.startsWith('/luvit-engagement');


  // Hide Navbar and Chatboat for admin routes AND wedding routes
  const shouldHideNavbar = isAdminRoute || isWeddingPage || isEngePage;

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
<Route path="/luvit-engagement/:slug" element={<EngagementPage/>} />

        {/* Admin routes - Navbar and Chatboat already hidden */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="clinetrequestlist" element={<ClinetRequestList />} />
          <Route path="client-requests/view/:id" element={<ClientRequestView />} />
          <Route path="client-requests/edit/:id" element={<ClientRequestEdit />} />




          {/* Add other admin routes here */}
        </Route>
      </Routes>

      <Analytics />
    </div>
  );
}

export default App;