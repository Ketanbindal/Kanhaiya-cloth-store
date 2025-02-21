import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Login.css";

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
        navigate("/dashboard"); 
      }, 2000);
    } catch (err) {
      console.error("Network/Client Error:", err);
      setError("Network Error: Unable to reach the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="LoginArea">
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        
        <span>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, passwordRef)}
            ref={usernameRef}
          />
        </span>

        <span>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="Password"
            placeholder="Password"
            value={formData.Password}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, null)}
            ref={passwordRef}
          />
        </span>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
