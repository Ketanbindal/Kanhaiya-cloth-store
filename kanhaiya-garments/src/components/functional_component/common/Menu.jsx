import React, { useState, useEffect } from 'react';
import './Menu.css';

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isMenuOpen && !event.target.closest('.menu-container')) {
        setIsMenuOpen(false); 
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMenuOpen]); 

  return (
    <div className="menu-container"> 
      <a href="#" onClick={toggleMenu}>Menu</a> 
      <div className={`menu-dropdown ${isMenuOpen ? 'open' : ''}`}> 
        <ul>
          <li>
            <a href="#">Men</a>
            <ul className="submenu">
              <li><a href="#">Clothing</a></li>
              <li><a href="#">Footwear</a></li>
              <li><a href="#">Accessories</a></li>
            </ul>
          </li>
          <li>
            <a href="#">Women</a>
            <ul className="submenu">
              <li><a href="#">Clothing</a></li>
              <li><a href="#">Footwear</a></li>
              <li><a href="#">Accessories</a></li>
            </ul>
          </li>
          <li>
            <a href="#">Kids</a>
            <ul className="submenu">
              <li><a href="#">Clothing</a></li>
              <li><a href="#">Toys</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;