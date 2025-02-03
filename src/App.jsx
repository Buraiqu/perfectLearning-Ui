import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/authContext';
import PublicLayout from './layouts/publicLayout';
import LandingPage from './pages/public/landingPage';

function App() {

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
