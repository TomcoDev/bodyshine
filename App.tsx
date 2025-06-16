
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ProductExplorer from './components/ProductExplorer';
import VirtualTryOn from './components/VirtualTryOn';
import AppointmentBooking from './components/AppointmentBooking';
import GeminiSkincareAdvisor from './components/GeminiSkincareAdvisor';
import WellnessHub from './components/WellnessHub';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HeroSection setCurrentPage={setCurrentPage} />;
      case 'products':
        return <ProductExplorer />;
      case 'tryon':
        return <VirtualTryOn />;
      case 'appointments':
        return <AppointmentBooking />;
      case 'advisor':
        return <GeminiSkincareAdvisor />;
      case 'wellness':
        return <WellnessHub />;
      default:
        return <HeroSection setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
