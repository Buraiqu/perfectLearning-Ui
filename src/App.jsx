import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/authContext';
import PublicLayout from './layouts/publicLayout';
import AuthLayout from './layouts/authLayout';
import LandingPage from './pages/public/landingPage';
import Logo from '/assets/logo_short.svg';
import { useEffect } from 'react';
import AboutPage from './pages/public/About/about';
import SubscriptionPlans from './pages/public/SubscriptionPans/subscriptionPlans';
import Login from './pages/auth/Login/login';
import Signup from './pages/auth/Signup/signup';
import LoginVerification from './pages/auth/Verification/loginVerification';
import SignupVerification from './pages/auth/Verification/signupVerification';
import PasswordResetPage from './pages/auth/PasswordReset/passwordResetPage';
import PrivateRoute from './routes/privateRoute';
import Dashboard from './pages/Main/Dashboard/dashboard';
import MyCourse from './pages/Main/MyCourse/myCourse';
import ProfilePage from './pages/Main/Profile/profile';
import UpgradePlans from './pages/Main/UpgradePlans/upgradePlans';
import StudyPlanner from './pages/Main/StudyPlanner/studyPlanner';
import CourseMaterialTopics from './pages/Main/CourseMaterial/CourseMaterialTopics/courseMaterialTopics';
import CourseMaterialMain from './pages/Main/CourseMaterial/CourseMaterialLanding/courseMaterial';
import CourseMaterialContentViewer from './pages/Main/CourseMaterial/CourseMaterialContentViewer/courseMaterialContentViewer';

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
            <Route path="/signupVerification" element={<SignupVerification />} />
            <Route path="/loginVerification" element={<LoginVerification />} />
            <Route path="/PasswordResetPage" element={<PasswordResetPage />} />
          </Route>

          {/* Private routes - All authenticated routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/main" >
              <Route index element={<Navigate to="/main/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="my-courses" element={<MyCourse />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="upgrade-plan" element={<UpgradePlans />} />
              <Route path="study-planner" element={<StudyPlanner />} />
              <Route path="course-material" element={<CourseMaterialMain/>} />
              <Route path="course-material-topics" element={<CourseMaterialTopics />} />
              <Route path="course-material-content-viewer" element={<CourseMaterialContentViewer />} />
            </Route>
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
