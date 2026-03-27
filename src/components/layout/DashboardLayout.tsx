import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="app-root bg-[#F3F7FF] text-[#111827]">
      <div className="min-h-screen border border-[#1D4ED8] bg-white/40">
        <div className="flex min-h-screen flex-col md:flex-row">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
