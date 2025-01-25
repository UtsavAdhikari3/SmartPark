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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Welcome to User Page
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Available Parking Slots
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {slots.map((slot, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg text-center font-medium shadow-md ${
                slot.status === "occupied"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {slot.number} - {slot.status}
            </div>
          ))}
        </div>
      </div>

      {vehicleInfo && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Your Vehicle Information
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">License Plate:</span>{" "}
              {vehicleInfo.licensePlate}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Entry Time:</span>{" "}
              {new Date(vehicleInfo.entryTime).toLocaleString()}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Status:</span>{" "}
              {vehicleInfo.isOccupied ? "Occupied" : "Free"}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Slot Number:</span>{" "}
              {vehicleInfo.slotNumber}
            </p>
            {vehicleInfo.fee && (
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">Fee:</span> $
                {vehicleInfo.fee}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/user-login";
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserPage;
