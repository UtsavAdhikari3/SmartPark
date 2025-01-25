import React, { useState, useEffect } from "react";

function UserPage() {
  const [slots, setSlots] = useState([]);
  const [vehicleInfo, setVehicleInfo] = useState(null);

  useEffect(() => {
    fetchParkingInfo();
    fetchVehicleInfo();
  }, []);

  const fetchParkingInfo = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/parking/slots", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setSlots(data);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  const fetchVehicleInfo = async () => {
    try {
      // Get license plate from localStorage that was saved during login
      const licensePlate = localStorage.getItem("licensePlate");
      const response = await fetch(
        `http://localhost:5000/api/vehicle/info?licensePlate=${licensePlate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setVehicleInfo(data);
    } catch (error) {
      console.error("Error fetching vehicle info:", error);
    }
  };

  return (
    <div>
      <h1>Welcome to User Page</h1>

      <div className="parking-info">
        <h2>Available Parking Slots</h2>
        <div className="slots-grid">
          {slots.map((slot, index) => (
            <div key={index} className={`slot ${slot.status}`}>
              {slot.number} - {slot.status}
            </div>
          ))}
        </div>
      </div>

      {vehicleInfo && (
        <div className="vehicle-info">
          <h2>Your Vehicle Information</h2>
          <p>License Plate: {vehicleInfo.licensePlate}</p>
          <p>Entry Time: {vehicleInfo.entryTime}</p>
          <p>Parking Duration: {vehicleInfo.duration}</p>
          <p>Status: {vehicleInfo.status}</p>
          <p>Slot Number: {vehicleInfo.slotNumber}</p>
          {vehicleInfo.fee && <p>Fee: ${vehicleInfo.fee}</p>}
        </div>
      )}

      <div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/user-login";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserPage;
