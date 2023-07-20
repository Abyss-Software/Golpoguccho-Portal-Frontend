import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import Topnav from '../components/topnav/Topnav';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Topnav sidebarEnabled toggleSidebar={toggleSidebar} />
      <div className="flex h-[calc(100%-64px)]">
        <Sidebar open={sidebarOpen} />
        <div className="h-full w-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
