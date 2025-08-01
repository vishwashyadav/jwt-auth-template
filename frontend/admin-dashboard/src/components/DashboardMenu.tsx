import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardMenu.css';

const menuConfig: Record<string, Array<{ label: string; path: string; icon: string }>> = {
  admin: [
    { label: 'Dashboard', path: '/admin', icon: '🏠' },
    { label: 'User Management', path: '/admin/users', icon: '👥' },
    { label: 'Analytics', path: '/admin/analytics', icon: '📊' },
    { label: 'Settings', path: '/admin/settings', icon: '⚙️' },
    { label: 'Demo: Upler Projects', path: '/admin/projects', icon: '🚀' },
  ],
  user: [
    { label: 'My Dashboard', path: '/user', icon: '🏠' },
    { label: 'Profile', path: '/user/profile', icon: '👤' },
    { label: 'Tasks', path: '/user/tasks', icon: '📝' },
    { label: 'Settings', path: '/user/settings', icon: '⚙️' },
    { label: 'Demo: Upler Projects', path: '/user/projects', icon: '🚀' },
  ],
};

const DashboardMenu: React.FC = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('name');
  const role = (localStorage.getItem('role') || 'user').toLowerCase();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="dashboard-menu">
      <div className="menu-header">
        <span className="menu-user-avatar">
          {name ? name[0].toUpperCase() : 'U'}
        </span>
        <span className="menu-user-name">{name || 'User'}</span>
        <button className="menu-logout" onClick={handleLogout}>Logout</button>
      </div>
      <ul className="menu-list">
        {menuConfig[role]?.map(item => (
          <li key={item.path}>
            <button className="menu-link" onClick={() => navigate(item.path)}>
              <span className="menu-icon">{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DashboardMenu;
