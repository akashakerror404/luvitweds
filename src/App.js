import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import HomeHeader from './Pages/Home/HomeHeader';
import Gallery from './Pages/Gallery/Gallery';
import Packages from './Pages/Packages/Packages';
import OurTeam from './Pages/OurTeam/OurTeam';
import About from './Pages/About/About';
import Navbar from './Pages/NavBar/Navbar';
import Chatboat from './Pages/chatboat/Chatboat';
// import ClientRequestDetails from './Pages/clinetdeatils/ClinetRequestDetils';
import WeddingPage from './Pages/Invitationcard/WeddingPage';
import { Analytics } from "@vercel/analytics/react";

function App() {

  const location = useLocation();

  // Hide Navbar for wedding route
  const isWeddingPage = location.pathname.startsWith("/luvit-wedding");

  return (
    <div className="App">

      {!isWeddingPage && <Navbar />}
      {!isWeddingPage && <Chatboat />}

      <Routes>
        <Route path="/" element={<HomeHeader />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/client-request-details" element={<ClientRequestDetails />} /> */}

        {/* Wedding page without Navbar */}
        <Route path="/luvit-wedding/:slug" element={<WeddingPage />} />
      </Routes>

      <Analytics />
    </div>
  );
}

export default App;
