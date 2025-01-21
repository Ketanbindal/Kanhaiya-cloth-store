import React, { useState } from 'react';
import './Contact.css'; // Import the CSS file

const Contact = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const toggleContact = () => {
    setIsContactOpen(!isContactOpen);
  };

  return (
    <div>
      <button onClick={toggleContact}>Contact</button> 

      {isContactOpen && (
        <div className="contact-sidebar">
          {/* Your contact form or list here */}
          <ul>
            <li>Email: contact@example.com</li>
            <li>Phone: +123 456 7890</li>
            {/* Add more contact details as needed */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Contact;