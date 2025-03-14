import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Header.css';
import { logoIcon } from '../../assets/Index';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScrollToPackages = (e) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      navigate('/');
    }
    setTimeout(() => {
      const packagesSection = document.getElementById('packages');
      if (packagesSection) {
        packagesSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Reload page as a fallback if already on home page
        window.location.href = '/#packages';
      }
    }, 100);
    toggleMenu(); // Close mobile menu after click
  };

  return (
    <div className="navbar-container py-5 mx-auto " id="main-header">
      {!isMenuOpen && (
        <nav className="relative navbar flex justify-between items-center w-11/12 mx-auto rounded-lg" style={{ padding: '15px' }}>
          <Link className="text-3xl font-bold leading-none" to="/">
            <img className="w-32" src={logoIcon} alt="Logo" />
          </Link>
          <div className="lg:hidden">
            <button className="navbar-burger flex items-center p-3" onClick={toggleMenu}>
              <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>
          <ul className="ml-auto nav-texts hidden lg:flex lg:items-end lg:w-auto lg:space-x-7">
            <li>
              <button onClick={handleScrollToPackages} className="pc-nav-text font-semibold">Packages</button>
            </li>
            <li>
              <Link className="pc-nav-text font-semibold" to="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </nav>
      )}

      {/* Mobile menu, displayed when isMenuOpen is true */}
      {isMenuOpen && (
        <div className="navbar-menu relative z-50">
          <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25" onClick={toggleMenu}></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-8/12 max-w-sm py-6 px-6 mobile-nav-menu border-r overflow-y-auto">
            <div className="flex items-center mb-8">
              <button className="navbar-close" onClick={toggleMenu}>
                <svg className="h-6 w-6 fill-current text-gray-900" viewBox="0 0 24 24">
                  <path d="M18.36 6.64a1 1 0 010 1.41L13.41 12l4.95 4.95a1 1 0 11-1.41 1.41L12 13.41l-4.95 4.95a1 1 11-1.41-1.41L10.59 12 5.64 7.05a1 1 111.41-1.41L12 10.59l4.95-4.95a1 1 011.41 0z"></path>
                </svg>
              </button>
            </div>
            <div>
              <Link className="text-3xl font-bold leading-none" to="/">
                <img className="w-32" src={logoIcon} alt="Logo" />
              </Link>
              <ul>
                <li className="mb-1 mt-10">
                  <button onClick={handleScrollToPackages} className="nav-text block">Packages</button>
                </li>
                <li className="mb-1">
                  <Link to="/contact-us" className="nav-text block p-4">Contact Us</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;
