import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ErrorBoundary } from '../common/ErrorBoundary';

export const TenantLayout = () => {
  return (
    <div className="flex h-screen bg-[#12131a] text-[#e2e1eb] font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-[#12131a] flex flex-col justify-between">
          <ErrorBoundary>
            <div className="flex-1">
              <Outlet />
            </div>
          </ErrorBoundary>
          <Footer />
        </main>
      </div>
    </div>
  );
};
