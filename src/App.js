import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from './Components/LoginRegister/LoginRegister';
import AdminLogin from './Components/LoginRegister/AdminLogin';
import Dashboard from './Components/Dashboard/Dashboard';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';
import MyProfile from './Components/PatientProfile/MyProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Header />
              <Dashboard />
              <Footer />
            </>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <>
             
              <AdminDashboard />
              <Footer />
            </>
          }
        />
        <Route
          path="/my-profile"
          element={
            <>
              <Header />
              <MyProfile />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
