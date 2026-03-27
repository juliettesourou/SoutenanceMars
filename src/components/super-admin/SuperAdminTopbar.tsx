import React from 'react';
import Topbar from './navigation/Topbar';
import AdminThemeSwitcher from '../adminCEntre/AdminThemeSwitcher';

const SuperAdminTopbar: React.FC = () => {
  return (
    <div className="space-y-3">
      <Topbar />
      <div className="flex justify-end">
        <AdminThemeSwitcher />
      </div>
    </div>
  );
};

export default SuperAdminTopbar;
