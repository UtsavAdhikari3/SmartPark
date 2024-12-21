import React, { useState } from 'react';
import axios from 'axios';

const SearchVehicle = () => {
  const [licensePlate, setLicensePlate] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      // Call the backend /search endpoint
      const response = await axios.get(`http://localhost:5000/api/parking/search`, {
        params: { licensePlate },
      });
      setResult(response.data); // Store the response in state
      setError(''); // Clear any previous errors
    } catch (err) {
      setError('Vehicle not found');
      setResult(null); // Clear the result
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Search Vehicle</h2>
      <input
        type="text"
        placeholder="Enter License Plate"
        value={licensePlate}
        onChange={(e) => setLicensePlate(e.target.value)}
        style={{
          padding: '10px',
          width: '100%',
          marginBottom: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Search
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h3>Vehicle Details</h3>
          <p><strong>License Plate:</strong> {result.licensePlate}</p>
          <p><strong>Entry Time:</strong> {new Date(result.entryTime).toLocaleString()}</p>
          <p><strong>Exit Time:</strong> {result.exitTime}</p>
          <p><strong>Slot Number:</strong> {result.slotNumber}</p>
          <p><strong>Fee:</strong> {result.fee}</p>
        </div>
      )}
    </div>
  );
};

export default SearchVehicle;
