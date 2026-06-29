import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Theme State (Dark vs Light) with LocalStorage persistence
  const [theme, setTheme] = useState(() => localStorage.getItem('forgeflow_theme') || 'dark');

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('forgeflow_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Super Admin Session (Platform Owner: Kushal Pandey)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [superAdminUser, setSuperAdminUser] = useState({
    name: 'Kushal Pandey',
    email: 'kushal@forgeflow.io',
    title: 'Platform Owner & Super Admin'
  });

  // Organization User Session
  const [user, setUser] = useState({
    id: 'usr_demo_123',
    name: 'Alex Mercer',
    email: 'admin@forgeflow.io',
    role: 'owner', // owner, admin, builder, member, viewer
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  });

  const [currentOrg, setCurrentOrg] = useState({
    id: 'org_enterprise_1',
    name: 'Acme Global Corp',
    slug: 'acme-global',
    tier: 'Enterprise Scale'
  });

  const [organizations, setOrganizations] = useState([
    { id: 'org_enterprise_1', name: 'Acme Global Corp', slug: 'acme-global', tier: 'Enterprise Scale', status: 'Active', users: 14, workflows: 8, mrr: '$18,400' },
    { id: 'org_dev_2', name: 'DevOps Platform Team', slug: 'devops-team', tier: 'Pro Plan', status: 'Active', users: 5, workflows: 4, mrr: '$6,400' }
  ]);

  const loginSuperAdmin = (email, password) => {
    setIsSuperAdmin(true);
    return true;
  };

  const logoutSuperAdmin = () => {
    setIsSuperAdmin(false);
  };

  const loginOrgUser = async (email, password, selectedRole = 'owner') => {
    const userObj = {
      id: 'usr_' + Date.now(),
      name: email ? email.split('@')[0] : 'Alex Mercer',
      email: email || 'admin@forgeflow.io',
      role: selectedRole,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };
    setUser(userObj);

    // Persist to MongoDB Atlas backend
    try {
      await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userObj.email, role: selectedRole })
      });
    } catch (err) {
      console.error('Failed to sync login to MongoDB:', err);
    }
    return true;
  };

  const registerOrganization = async (orgName, ownerEmail, password) => {
    const newOrg = {
      id: `org_${Date.now()}`,
      name: orgName,
      slug: orgName.toLowerCase().replace(/\s+/g, '-'),
      tier: 'Pro Plan',
      status: 'Active',
      users: 1,
      workflows: 0,
      mrr: '$0'
    };
    const newUserObj = {
      id: `usr_${Date.now()}`,
      name: ownerEmail.split('@')[0],
      email: ownerEmail,
      role: 'owner',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };

    setOrganizations(prev => [...prev, newOrg]);
    setCurrentOrg(newOrg);
    setUser(newUserObj);

    // Persist Organization & User directly to MongoDB Atlas
    try {
      await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orgName, email: ownerEmail, password: password || 'kushal1088' })
      });
    } catch (err) {
      console.error('Failed to register account in MongoDB Atlas:', err);
    }
  };

  const logoutOrgUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      theme,
      toggleTheme,
      isSuperAdmin, 
      superAdminUser, 
      loginSuperAdmin, 
      logoutSuperAdmin,
      user, 
      setUser,
      loginOrgUser,
      logoutOrgUser,
      registerOrganization,
      currentOrg, 
      setCurrentOrg, 
      organizations,
      setOrganizations
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
