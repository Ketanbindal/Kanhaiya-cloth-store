import React from 'react';
import './Navbar.css';
import Menu from './Menu';
import Contact from './Contact'; // Import the Menu component

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container"> 
        <h1 className="logo">Kanhaiya Garments</h1> 
      </div>
      <ul className="navbar-list">
        <li className="navbar-item"><a href="/">Home</a></li>
        <li className="navbar-item"><Menu /></li> 
        <li className="navbar-item"><a href="/about">About</a></li>
        <li className="navbar-item"><Contact></Contact></li>
      </ul>
      <div className="actions">
        <button className="search-btn">
          <img src='/assets/Search.jpg' alt="Search" /> 
        </button>
        <button className="cart-btn">
          <img src='/assets/Cart.jpg' alt="Cart" /> 
        </button>
      </div>
    </nav>
  );
};

export default Navbar;