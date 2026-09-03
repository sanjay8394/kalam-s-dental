import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import SmileQuiz from './components/SmileQuiz';
import Doctors from './components/Doctors';
import Gallery from './components/Gallery';
import BookingModal from './components/BookingModal';
import PatientPortal from './components/PatientPortal';
import AdminDashboard from './components/AdminDashboard';
import ContactFAQ from './components/ContactFAQ';
import Footer from './components/Footer';

import { fetchServices, fetchDoctors } from './api';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');

  const [portalOpen, setPortalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    async function loadInitialData() {
      const [sData, dData] = await Promise.all([
        fetchServices(),
        fetchDoctors()
      ]);
      setServices(sData);
      setDoctors(dData);
    }
    loadInitialData();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleOpenBooking = (serviceName = '', doctorName = '') => {
    setSelectedService(serviceName);
    setSelectedDoctor(doctorName);
    setBookingOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenPortal={() => setPortalOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main style={{ flex: 1 }}>
        <Hero
          onOpenBooking={handleOpenBooking}
          onOpenQuiz={() => {
            const el = document.getElementById('quiz');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <Services
          services={services}
          onSelectService={(serviceTitle) => handleOpenBooking(serviceTitle, '')}
        />

        <SmileQuiz
          onOpenBooking={(recService) => handleOpenBooking(recService, '')}
        />

        <Doctors
          doctors={doctors}
          onSelectDoctor={(docName) => handleOpenBooking('', docName)}
        />

        <Gallery />

        <ContactFAQ />
      </main>

      <Footer onOpenBooking={handleOpenBooking} />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={selectedService}
        initialDoctor={selectedDoctor}
        services={services}
        doctors={doctors}
      />

      <PatientPortal
        isOpen={portalOpen}
        onClose={() => setPortalOpen(false)}
      />

      <AdminDashboard
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />

    </div>
  );
}
