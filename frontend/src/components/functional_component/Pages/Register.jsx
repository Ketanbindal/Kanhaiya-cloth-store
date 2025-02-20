import React, { useState, useRef } from "react";
import "./Register.css";
// import Navbar from "../common/Navbar";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    Password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const API_URL = "http://127.0.0.1:5000/api/auth/register"; // Correct API URL

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e, nextField) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextField) {
        nextField.current.focus();
      } else {
        handleSubmit(e); // Submit the form if it's the last field
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (formData.username.trim() === "") {
      setError("Username is required!");
      setLoading(false);
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email!");
      setLoading(false);
      return;
    }
    if (formData.Password.length < 6) {
      setError("Password must be at least 6 characters!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Fixed JSON Stringify
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      setSuccess("Registration successful!");
      setFormData({ username: "", email: "", Password: "" }); // Reset form
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
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
              name="Password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, null)} // Submit on Enter
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
