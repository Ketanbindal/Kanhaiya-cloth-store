import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/functional_component/Pages/Register";
import Login from "./components/functional_component/Pages/Login";
import Dashboard from "./components/functional_component/Pages/Dashboard";
import Navbar from "./components/functional_component/common/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
