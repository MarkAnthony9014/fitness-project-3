import React from 'react';

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4 ">
      <div className="">
        &copy;{new Date().getFullYear()} by Marc, Rob, and Angel
      </div>
    </footer>
  );
};

export default Footer;
