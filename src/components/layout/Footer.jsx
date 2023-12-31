import React from 'react';

function Footer() {
  const footerYear = new Date().getFullYear();
  return (
    <>
      <footer className="footer p-4 bg-gray-700 text-primary-content footer-center">
        <p>Copyright &copy; {footerYear}</p>
      </footer>
    </>
  );
}

export default Footer;
