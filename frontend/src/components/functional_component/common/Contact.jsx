import React, { useState, useEffect } from 'react';
import './Contact.css'; // Import your CSS file

const Contact = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const toggleContact = () => {
    setIsContactOpen(!isContactOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isContactOpen && !event.target.closest('.contact-sidebar')) {
        setIsContactOpen(false); 
      }
    };

    // Attach event listener only when the contact sidebar is open
    if (isContactOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    // Cleanup: Remove event listener when component unmounts or sidebar closes
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isContactOpen]); // Run effect only when isContactOpen changes

  return (
    <div>
      <a onClick={toggleContact}>Contact</a> 

      {isContactOpen && (
        <div className="contact-sidebar"> 
          <ul>
            <li>Email: contact@example.com</li>
            <li>Phone: +123 456 7890</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Contact;