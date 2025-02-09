import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/authContext';
import PublicLayout from './layouts/publicLayout';
import AuthLayout from './layouts/authLayout';
import LandingPage from './pages/public/landingPage';
import Logo from './assets/logo_short.svg';
import { useEffect } from 'react';
import AboutPage from './pages/public/About/about';
import SubscriptionPlans from './pages/public/SubscriptionPans/subscriptionPlans';
import Login from './pages/auth/Login/login';
import Signup from './pages/auth/Signup/signup';
import OnBoarding from './pages/auth/OnBoarding/onBoarding';

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
          {/* Public routes with navbar and footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/subscription" element={<SubscriptionPlans />} />  
          </Route>

          {/* Auth routes without navbar and footer */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="onboarding" element={<OnBoarding />} />
          </Route>

          {/* Private routes */}
          {/* <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route> */}
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
