import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/authContext';
import PublicLayout from './layouts/publicLayout';
import LandingPage from './pages/public/landingPage';
import Logo from './assets/logo_short.svg';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    if (Logo) {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = Logo;
      document.head.appendChild(link);
    }
  }, [Logo]);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>

          {/* <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route> */}
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
