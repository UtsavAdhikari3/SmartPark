import React, { useState } from 'react';
import { logVehicleEntry } from '../services/apiService';

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select an image to upload.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file); // Append the selected image file

      const response = await logVehicleEntry(formData); // Call API
      setMessage(
        `Entry Success! License Plate: ${response.licensePlate}, Slot: ${response.slotNumber}`
      );
    } catch (err) {
      console.error('Error logging entry:', err);
      setMessage(err.response?.data?.message || 'Error processing image');
    }
  };

  return (
    <div>
      <h2>Upload Vehicle Image</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadImage;
