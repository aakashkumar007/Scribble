// Dashboard.js

import { Outlet } from 'react-router-dom';
import UserMenu from './UserMenu';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <UserMenu />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
