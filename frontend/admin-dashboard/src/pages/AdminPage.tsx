import React from 'react';
import DashboardMenu from '../components/DashboardMenu';
import '../components/DashboardMenu.css';

const getInitials = (name: string) => {
  if (!name) return '';
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const AdminPage: React.FC = () => {
  const fullName = localStorage.getItem('name') || '';
  const initials = getInitials(fullName);
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '1rem 2rem'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(44,62,80,0.10)',
          }}>{initials}</div>
          <span style={{fontWeight: 600, color: '#2575fc'}}>{fullName}</span>
          <button onClick={handleLogout} style={{background:'#e74c3c',color:'#fff',border:'none',borderRadius:6,padding:'0.5rem 1rem',fontSize:'1rem',cursor:'pointer'}}>Logout</button>
        </div>
      </div>
      <DashboardMenu />
      <h1 style={{textAlign:'center',marginTop:'2rem'}}>Admin Dashboard</h1>
      {/* Add more admin content here */}
    </div>
  );
};

export default AdminPage;
