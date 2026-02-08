
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import DetailView from './pages/DetailView.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import SplashScreen from './components/SplashScreen.tsx';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize Local Database
    if (!localStorage.getItem('mmgg_listings')) {
      const initialData = [
        {
          id: '1',
          type: 'properties',
          title: 'Royal Eko Residence',
          location: 'Ikoyi, Lagos',
          price: '450000000',
          description: 'A masterpiece of contemporary architecture situated in the heart of Ikoyi. Features 5 ensuite bedrooms, a private cinema, and smart home automation.',
          images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200'],
          date: new Date().toISOString()
        }
      ];
      localStorage.setItem('mmgg_listings', JSON.stringify(initialData));
    }
  }, []);

  if (!isLoaded) {
    return <SplashScreen onFinish={() => setIsLoaded(true)} />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Home />} />
          <Route path="/properties/:id" element={<DetailView />} />
          <Route path="/furniture" element={<Home />} />
          <Route path="/furniture/:id" element={<DetailView />} />
          <Route path="/paints" element={<Home />} />
          <Route path="/paints/:id" element={<DetailView />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
