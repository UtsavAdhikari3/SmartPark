import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Parking Management</h1>
      <div>
        <Link to="/upload">
          <button>Upload Image</button>
        </Link>
        <Link to="/logs">
          <button>View Logs</button>
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
