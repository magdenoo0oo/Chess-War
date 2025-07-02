import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './Navbar';
import { MatrixRain } from '../Effects/MatrixRain';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-war-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <MatrixRain />
        <div className="absolute inset-0 bg-gradient-to-br from-war-dark via-war-gray/20 to-war-dark"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-tactical-primary/5 via-transparent to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main className="relative">
          <Outlet />
        </main>
      </div>
      
      {/* Toast Notifications */}
      <Toaster
        position="top-left"
        toastOptions={{
          className: '',
          style: {
            background: '#1a1a1a',
            color: '#ffffff',
            border: '1px solid #1a4d3a',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#dc2626',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </div>
  );
};