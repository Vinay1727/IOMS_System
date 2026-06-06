import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo" />
          <span className="footer-name">IMS <span className="footer-name-dim">Cosmic</span></span>
        </div>
        <div className="footer-links">
          <a href="#privacy" className="footer-link">Privacy</a>
          <a href="#terms" className="footer-link">Terms</a>
          <a href="#support" className="footer-link">Support</a>
        </div>
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} — crafted beyond the stars
        </div>
      </div>
    </footer>
  );
}
