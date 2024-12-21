import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import Home from './components/Home';
import ParkingLog from './components/ParkingLog';
import UploadImage from './components/UploadImage';
import SearchVehicle from './components/SearchVehicle';
import ProtectedRoutes from './components/ProtectedRoutes';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Protected Routes */}
        <Route
          path="/"
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
        <Route path="/search"
        element={<ProtectedRoutes>
          <SearchVehicle/>
        </ProtectedRoutes>}
        ></Route>

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
