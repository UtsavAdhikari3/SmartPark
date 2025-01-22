import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginForm from "./components/LoginForm";
import LoginFormUser from "./components/LoginFormUser";
import Home from "./components/Home";
import ParkingLog from "./components/ParkingLog";
import UploadImage from "./components/UploadImage";
import SearchVehicle from "./components/SearchVehicle";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProtectedRoutes2 from "./components/ProtectedRoutes2";
import { adminLogin } from "./services/apiService";
import { userLogin } from "./services/apiService";
import UserPage from "./components/UserPage";

const App = () => {
  const handleAdminLogin = async (username, password) => {
    // Your existing admin login logic here
    const { token } = await adminLogin(username, password);
    localStorage.setItem("token", `Bearer ${token}`);
  };

  const handleUserLogin = async (username, licensePlate, password) => {
    // Your existing admin login logic here
    const { token } = await userLogin(username, licensePlate, password);
    localStorage.setItem("token", `Bearer ${token}`);
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
          element={<LoginFormUser isAdmin={false} onSubmit={handleUserLogin} />}
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
        <Route
          path="/userPage"
          element={
            <ProtectedRoutes2>
              <UserPage />
            </ProtectedRoutes2>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
