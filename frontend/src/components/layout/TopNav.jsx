import React, { useState, useCallback } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard, Package, Users, ShoppingCart, FileText, BarChart2, Menu, X
} from 'lucide-react';
import './TopNav.css';

const navItems = [
  { label: 'Dashboard', path: '/', icon: <LayoutDashboard size={16} /> },
  { label: 'Products', path: '/products', icon: <Package size={16} /> },
  { label: 'Customers', path: '/customers', icon: <Users size={16} /> },
  { label: 'Orders', path: '/orders', icon: <ShoppingCart size={16} /> },
  { label: 'Reports', path: '/reports', icon: <FileText size={16} /> },
  { label: 'Analytics', path: '/analytics', icon: <BarChart2 size={16} /> },
];

export default function TopNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [spinningId, setSpinningId] = useState(null);

  const toggleMenu = () => setIsOpen(o => !o);
  const closeMenu = () => setIsOpen(false);

  const handleNavClick = useCallback((path) => {
    setSpinningId(path);
    setTimeout(() => setSpinningId(null), 600);
    closeMenu();
  }, []);

  return (
    <nav className="topnav">
      <div className="topnav-container">
        <Link to="/" className="logo-link" onClick={closeMenu}>
          <div className="logo-icon-wrapper">
            <div className="logo-icon-ring"></div>
            <div className="logo-icon-core" />
          </div>
          <div className="logo-text">
            <span className="logo-ims">IMS</span>
            <span className="logo-subtitle">Cosmic Inventory</span>
          </div>
        </Link>

        <div className="nav-links">
          {navItems.map((item) => {
            const isSpinning = spinningId === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active' : ''}${isSpinning ? ' spinning' : ''}`
                }
                onClick={() => handleNavClick(item.path)}
              >
                <span className={`nav-icon-wrap${isSpinning ? ' spin' : ''}`}>
                  {item.icon}
                </span>
                {item.label}
              </NavLink>
            );
          })}
        </div>

        <div className="nav-right">
          <button
            className={`hamburger${isOpen ? ' open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu${isOpen ? ' open' : ''}`}>
        {navItems.map((item) => {
          const isSpinning = spinningId === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `mobile-nav-link${isActive ? ' active' : ''}${isSpinning ? ' spinning' : ''}`
              }
              onClick={() => handleNavClick(item.path)}
            >
              <span className={`nav-icon-wrap${isSpinning ? ' spin' : ''}`}>
                {item.icon}
              </span>
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
