import React from 'react';
import Header from './Header';
import { Outlet, Link } from 'react-router-dom';
import { FaHeartbeat, FaShieldAlt } from 'react-icons/fa';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 relative selection:bg-teal-500 selection:text-white">
      {/* Background ambient medical glows & grid */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-teal-100/50 rounded-full blur-3xl" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#0f766e 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Main container */}
      <div className="relative z-10 flex flex-col flex-grow">
        {/* Top Navbar */}
        <div className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-slate-200/80 shadow-sm shadow-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
            <Header />
          </div>
        </div>

        {/* Content Outlet */}
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </main>

        {/* Modern Veterinary Footer */}
        <footer className="mt-auto border-t border-slate-200/80 bg-white/70 backdrop-blur-sm py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2 font-medium">
              <span className="p-1 rounded-md bg-teal-50 text-teal-600">
                <FaHeartbeat className="text-sm" />
              </span>
              <span>AnimalDB Veterinary Clinical System</span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="text-slate-400">Enterprise Animal Registry & Patient Health</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1">
                <FaShieldAlt className="text-teal-600" /> Secure EHR
              </span>
              <span>© {new Date().getFullYear()} AnimalDB Clinic</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
