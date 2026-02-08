
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import DetailView from './pages/DetailView.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import SplashScreen from './components/SplashScreen.tsx';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Initialize store if empty
  useEffect(() => {
    if (!localStorage.getItem('mmgg_listings')) {
      localStorage.setItem('mmgg_listings', JSON.stringify([]));
    }
  }, []);

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Home />} />
          <Route path="/properties/:id" element={<DetailView />} />
          <Route path="/furniture" element={<Home />} />
          <Route path="/paints" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
