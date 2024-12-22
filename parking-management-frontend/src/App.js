import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import ParkingLog from "./components/ParkingLog";
import UploadImage from "./components/UploadImage";
import SearchVehicle from "./components/SearchVehicle";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { adminLogin } from "./services/apiService";

const App = () => {
  const handleAdminLogin = async (username, password) => {
    // Your existing admin login logic here
    const { token } = await adminLogin(username, password);
    localStorage.setItem("token", `Bearer ${token}`);
  };

  const handleUserLogin = async (username, password) => {
    console.log("User login");
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={<LoginForm isAdmin={true} onSubmit={handleAdminLogin} />}
        />
        <Route
          path="/user-login"
          element={<LoginForm isAdmin={false} onSubmit={handleUserLogin} />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/logs"
          element={
            <ProtectedRoutes>
              <ParkingLog />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoutes>
              <UploadImage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoutes>
              <SearchVehicle />
            </ProtectedRoutes>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
