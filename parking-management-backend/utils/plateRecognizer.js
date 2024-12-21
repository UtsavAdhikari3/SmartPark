const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const FormData = require('form-data');
const fs = require('fs');

const recognizePlate = async (imagePath) => {
  const API_KEY = process.env.PLATE_RECOGNIZER_API_KEY; // Ensure the API key is correct
  const apiUrl = 'https://api.platerecognizer.com/v1/plate-reader/';

  try {
    const formData = new FormData();
    formData.append('upload', fs.createReadStream(imagePath));

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Token ${API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Plate recognition failed');
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return { plate: data.results[0].plate, confidence: data.results[0].score };
    }

    return null; // No plate detected
  } catch (err) {
    console.error('Error in recognizePlate:', err.message);
    throw new Error('Plate recognition failed');
  }
};

module.exports = { recognizePlate };
