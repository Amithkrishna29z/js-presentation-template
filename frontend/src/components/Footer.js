import React from 'react';
import './styles/Footer.css';

function Footer({darkMode}) {
  return (
    <footer  className={`footer ${darkMode ? 'dark-mode' : ''}`}>
      <p>&copy; 2024 Demo Company. All rights reserved.</p>
      <p>
        Contact us: 
        <a href="mailto:contact@democompany.com"> contact@democompany.com</a> | 
        <a href="tel:+1234567890"> +1 234 567 890</a>
      </p>
    </footer>
  );
}

export default Footer;
