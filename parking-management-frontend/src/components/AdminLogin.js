import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/apiService";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token } = await adminLogin(username, password); // Call the login API
      localStorage.setItem("token", `Bearer ${token}`); // Save token in localStorage
      navigate("/"); // Redirect to the home page
    } catch (err) {
      setError("Invalid credentials"); // Show error message
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <h1 className="text-6xl font-bold underline border-2 border-red-600">
        Hello world!
      </h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
