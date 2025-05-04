import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import RegisterCustomer from "./components/RegisterCustomer";
import RegisterAdmin from "./components/RegisterAdmin";
import VerifyEmail from "./components/VerifyEmail";
import AdminLogin from "./components/AdminLogin";

function App() {
  const [showVerifyLink, setShowVerifyLink] = useState(false);

  return (
    <Router>
      <Navigation showVerifyLink={showVerifyLink} />
      <div className="container mt-4">
        <Routes>
          <Route
            path="/register/customer"
            element={
              <RegisterCustomer />
            }
          />
          <Route
            path="/register/admin"
            element={
              <RegisterAdmin  />
            }
          />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/login/admin" element={<AdminLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-4">
      <Link className="navbar-brand text-light" to="/">
        Auth System
      </Link>
      <div className="navbar-nav">
        <Link className="nav-link text-light" to="/register/customer">
          Customer Register
        </Link>
        <Link className="nav-link text-light" to="/register/admin">
          Admin Register
        </Link>
       
          <Link className="nav-link text-warning fw-bold" to="/verify">
            Verify Email
          </Link>
      
        <Link className="nav-link text-light" to="/login/admin">
          Admin Login
        </Link>
      </div>
    </nav>
  );
};

export default App;
