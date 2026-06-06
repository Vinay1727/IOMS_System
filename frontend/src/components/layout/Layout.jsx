import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopNav from './TopNav';
import Footer from './Footer';
import './Layout.css';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="layout-container">
      <div className="ambient-glow" />
      <div className="ambient-glow-2" />
      <TopNav />
      <main className="layout-content" key={location.pathname}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
