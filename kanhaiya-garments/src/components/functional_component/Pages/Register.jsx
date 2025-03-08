import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    Password: "", // Keeping "Password" as requested
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api/auth/register"; // Ensure backend runs on this port

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
        username: formData.username, // Keep "username" consistent
        email: formData.email, // Keep "email" consistent
        Password: formData.Password, // Change "Password" to "password"
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
        // If backend returns an array of errors, format them
        if (data.errors && Array.isArray(data.errors)) {
          throw new Error(data.errors.map((err) => err.msg).join("\n"));
        } else {
          throw new Error(data.error || data.message || "Something went wrong!");
        }
      }
  
      setSuccess("Registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 1000); 
      setFormData({ username: "", email: "", Password: "" }); // Reset form
    } catch (err) {
      console.log(err)
      setError(err.message); // Display all error messages in a single string
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
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
              onKeyDown={(e) => handleKeyDown(e, emailRef)}
              ref={usernameRef}
            />
          </span>
          <span>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
              ref={emailRef}
            />
          </span>
          <span>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="Password" // Keeping "Password" capitalized
              placeholder="Password"
              value={formData.Password}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, null)}
              ref={passwordRef}
            />
          </span>
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </>
  );
}
