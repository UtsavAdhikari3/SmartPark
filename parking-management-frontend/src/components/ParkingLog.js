import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ParkingLog = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [logs, setLogs] = useState([]);

  // Fetch parking logs
  const fetchLogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/parking/logs');
      setLogs(response.data);
    } catch (err) {
      console.error('Error fetching logs:', err.message);
      setMessage('Failed to fetch parking logs');
    }
  };

  // Fetch logs on component mount
  useEffect(() => {
    fetchLogs();
  }, []);

  // Handle vehicle entry
  const handleEntry = async () => {
    if (!file) {
      alert('Please upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/api/parking/entry', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(`Entry Success! Slot: ${response.data.slotNumber}`);
      fetchLogs(); // Refresh logs
      setFile(null); // Clear file input
    } catch (err) {
      console.error('Error during entry:', err.message);
      setMessage('Error processing entry');
    }
  };

  // Handle vehicle exit
  const handleExit = async () => {
    if (!file) {
      alert('Please upload an image to proceed with exit');
      console.log('No file selected for exit process'); // Debugging log
      return;
    }
  
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      console.log('Initiating exit process...'); // Debugging log
      const response = await axios.post('http://localhost:5000/api/parking/exit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      // Success: Display fee and refresh logs
      console.log('Exit Response:', response.data); // Debugging log
      setMessage(`Exit Success! Fee: ${response.data.fee}`);
      fetchLogs(); // Refresh parking logs
      setFile(null); // Clear the file input field
    } catch (err) {
      // Enhanced error handling and debugging
      console.error('Error during exit:', err);
  
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(`Exit Error: ${err.response.data.message}`);
      } else if (err.message) {
        setMessage(`Exit Error: ${err.message}`);
      } else {
        setMessage('Unknown error occurred during exit');
      }
    }
  };
  

  return (
    <div style={{ padding: '20px' }}>
      <h2>Parking Log</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <button onClick={handleEntry} style={{ marginRight: '10px', padding: '10px' }}>
          Entry
        </button>
        <button onClick={handleExit} style={{ padding: '10px' }}>
          Exit
        </button>
      </div>

      {message && <p>{message}</p>}

      <table border="1" style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>License Plate</th>
            <th>Entry Time</th>
            <th>Slot Number</th>
            <th>Exit Time</th>
            <th>Fee</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.licensePlate}</td>
              <td>{log.entryTime}</td>
              <td>{log.slotNumber}</td>
              <td>{log.exitTime}</td>
              <td>{log.fee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParkingLog;
