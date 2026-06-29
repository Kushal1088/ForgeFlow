import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users2, 
  Activity, 
  ShieldCheck, 
  Terminal, 
  LogOut, 
  Zap,
  Sun,
  Moon,
  User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SuperAdminProfileModal } from './SuperAdminProfileModal';
import { AuthConfirmModal } from '../../components/common/AuthConfirmModal';

export const SuperAdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { superAdminUser, logoutSuperAdmin, theme, toggleTheme } = useAuth();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const adminNavItems = [
    { name: 'Platform Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Organizations', path: '/admin/organizations', icon: Building2 },
    { name: 'User Directory', path: '/admin/users', icon: Users2 },
    { name: 'Platform Monitoring', path: '/admin/monitoring', icon: Activity },
    { name: 'Global Audit Logs', path: '/admin/audit-logs', icon: ShieldCheck },
    { name: 'Developer Console', path: '/admin/console', icon: Terminal },
  ];

  const handleLogoutClick = (e) => {
    e.stopPropagation();
    setLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    logoutSuperAdmin();
    navigate('/?logout=true');
  };

  return (
    <div className="flex h-screen bg-[#090a0f] text-[#e2e1eb] font-sans overflow-hidden select-none">
      {/* Super Admin Sidebar */}
      <aside className="w-64 bg-[#12131a] border-r border-[#464554]/40 flex flex-col h-screen sticky top-0 z-20">
        {/* Header */}
        <div className="p-4 border-b border-[#464554]/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8083ff] flex items-center justify-center shadow-glow">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                ForgeFlow Admin
              </h1>
              <span className="text-[9px] font-mono bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/30">
                Super Admin Portal
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#908fa0] px-3 mb-2">SaaS Control Plane</p>
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all relative ${
                  isActive 
                    ? 'bg-[#6366f1]/20 text-white shadow-inner' 
                    : 'text-[#908fa0] hover:text-[#e2e1eb] hover:bg-[#1e1f26]'
                }`}
              >
                {isActive && <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#6366f1] rounded-r-full shadow-glow" />}
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#6366f1]' : 'text-[#908fa0]'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Clickable Owner Profile Banner */}
        <div 
          onClick={() => setProfileModalOpen(true)}
          className="p-3 m-3 bg-[#1e1f26] hover:bg-[#282a31] border border-[#464554]/40 hover:border-[#6366f1]/60 rounded-xl space-y-2 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white group-hover:text-[#6366f1] transition-colors leading-tight">{superAdminUser.name}</p>
              <p className="text-[10px] font-mono text-[#6366f1]">{superAdminUser.title}</p>
            </div>
            <button onClick={handleLogoutClick} title="Logout Super Admin" className="text-[#908fa0] hover:text-red-400 transition-colors p-1">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-[#12131a]/80 backdrop-blur-md border-b border-[#464554]/40 px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#908fa0]">Global Cloud Region: us-east-1 (Primary)</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Light/Dark Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-[#1e1f26] border border-[#464554]/40 text-[#e2e1eb] hover:text-white transition-all flex items-center gap-2 text-xs font-mono"
              title="Toggle Light / Dark Theme"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" /> Light Mode
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#6366f1]" /> Dark Mode
                </>
              )}
            </button>

            <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded">
              System 100% Operational
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#090a0f] p-8">
          <Outlet />
        </main>
      </div>

      <SuperAdminProfileModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
      <AuthConfirmModal 
        isOpen={logoutModalOpen} 
        onClose={() => setLogoutModalOpen(false)} 
        onConfirm={confirmLogout} 
        title="Log Out Super Admin Console?"
        message="Are you sure you want to end your Super Admin platform session?"
        actionType="logout"
      />
    </div>
  );
};
