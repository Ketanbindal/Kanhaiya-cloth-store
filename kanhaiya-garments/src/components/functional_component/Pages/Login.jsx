import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
// import "./Login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    Password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate(); 

  const API_URL = "http://localhost:5000/api/auth/login";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e, nextField) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextField) {
        nextField.current.focus();
      } else {
        handleSubmit(e);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const requestData = {
        username: formData.username,
        Password: formData.Password,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Backend Error:", data);
        
        if (data.errors && Array.isArray(data.errors)) {
          setError(data.errors.map((err) => `• ${err.msg}`).join("\n"));
        } else if (data.message) {
          setError(`Error: ${data.message}`);
        } else {
          setError("Something went wrong! Please try again.");
        }
        return; // Stop execution on error
      }

      setSuccess("Login successful!");
      setFormData({ username: "", Password: "" });

      setTimeout(() => {
        navigate("/ "); 
      }, 2000);
    } catch (err) {
      console.error("Network/Client Error:", err);
      setError("Network Error: Unable to reach the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-6 lg:px-8">
      <div className="bg-off-white shadow-lg rounded-lg p-8 sm:p-10 w-full max-w-md">
        <img src="/Kanhaiya.png" alt="Logo" className="w-24 mx-auto" />
        <h2 className="text-black text-2xl font-bold text-center uppercase font-tenor">Login</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}
          
          <div className="mb-4">
            <label htmlFor="username" className="block text-label text-sm font-medium uppercase">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              ref={usernameRef}
              className="mt-1 block w-full px-4 py-2 border rounded-lg text-body bg-input-background focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-label text-sm font-medium uppercase">Password</label>
            <input
              type="password"
              id="password"
              name="Password"
              placeholder="Enter your password"
              value={formData.Password}
              onChange={handleChange}
              ref={passwordRef}
              className="mt-1 block w-full px-4 py-2 border rounded-lg text-body bg-input-background focus:ring-primary focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {/*Desktop view here */}
        
      </div>
    </div>
    
  );
};

