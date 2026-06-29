import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Workflow, 
  PlaySquare, 
  ShieldCheck, 
  Users, 
  ChevronDown, 
  Zap, 
  Plug,
  Activity,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SystemStatusModal } from '../common/SystemStatusModal';

export const Sidebar = () => {
  const location = useLocation();
  const { currentOrg, setCurrentOrg, organizations } = useAuth();
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/app', icon: LayoutDashboard },
    { name: 'Workflows', path: '/app/workflows', icon: Workflow },
    { name: 'Execution Runs', path: '/app/executions', icon: PlaySquare },
    { name: 'Integrations', path: '/app/integrations', icon: Plug },
    { name: 'Audit Logs', path: '/app/audit-logs', icon: ShieldCheck },
    { name: 'Settings & Team', path: '/app/settings', icon: Users },
  ];

  return (
    <>
      {/* Mobile Hamburger Header Trigger */}
      <div className="md:hidden fixed top-3 left-4 z-40">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-[#1e1f26] border border-[#464554] rounded-xl text-white shadow-2xl"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <aside className={`w-64 bg-[#1e1f26] border-r border-[#464554]/40 flex flex-col h-screen fixed md:sticky top-0 z-30 select-none transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        {/* Brand Header & Tenant Switcher */}
        <div className="p-4 border-b border-[#464554]/30 relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8083ff] flex items-center justify-center shadow-glow">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                ForgeFlow
                <span className="text-[10px] font-mono font-normal bg-[#6366f1]/20 text-[#c0c1ff] px-1.5 py-0.5 rounded border border-[#6366f1]/40">v2.4</span>
              </h1>
              <p className="text-xs text-[#908fa0] font-mono">Workflow Operating Platform</p>
            </div>
          </div>

          {/* Org Switcher Button */}
          <button 
            onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
            className="w-full bg-[#12131a] hover:bg-[#282a31] border border-[#464554]/50 rounded-lg p-2.5 flex items-center justify-between transition-colors text-left"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-6 h-6 rounded bg-[#6366f1]/30 text-[#c0c1ff] flex items-center justify-center font-bold text-xs">
                {currentOrg.name.charAt(0)}
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-[#e2e1eb] truncate">{currentOrg.name}</p>
                <p className="text-[10px] text-[#908fa0] font-mono">{currentOrg.tier}</p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-[#908fa0] flex-shrink-0" />
          </button>

          {/* Org Dropdown */}
          {orgDropdownOpen && (
            <div className="absolute left-4 right-4 top-[105px] bg-[#1a1b22] border border-[#464554] rounded-lg shadow-2xl z-50 p-1.5">
              <p className="text-[10px] font-mono uppercase text-[#908fa0] px-2 py-1">Switch Tenant</p>
              {organizations.map(org => (
                <button
                  key={org.id}
                  onClick={() => { setCurrentOrg(org); setOrgDropdownOpen(false); }}
                  className={`w-full text-left px-2 py-1.5 rounded text-xs flex items-center justify-between ${currentOrg.id === org.id ? 'bg-[#6366f1]/20 text-[#c0c1ff] font-semibold' : 'text-[#e2e1eb] hover:bg-[#282a31]'}`}
                >
                  <span className="truncate">{org.name}</span>
                  <span className="text-[9px] font-mono text-[#908fa0]">{org.tier}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#908fa0] px-3 mb-2">Platform Engine</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/app' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 relative ${
                  isActive 
                    ? 'bg-[#6366f1]/15 text-white font-semibold shadow-inner' 
                    : 'text-[#908fa0] hover:text-[#e2e1eb] hover:bg-[#282a31]/60'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#6366f1] rounded-r-full shadow-glow" />
                )}
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#6366f1]' : 'text-[#908fa0]'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* System Status Card */}
        <div 
          onClick={() => setStatusModalOpen(true)}
          className="p-3 m-3 bg-[#12131a] hover:bg-[#282a31] border border-[#464554]/40 rounded-xl cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-[#e2e1eb] group-hover:text-white">System Status</span>
            </div>
            <Activity className="w-3.5 h-3.5 text-[#908fa0] group-hover:text-[#6366f1]" />
          </div>
          <p className="text-[11px] text-[#908fa0]">99.99% operational across 14 workers.</p>
        </div>
      </aside>

      <SystemStatusModal isOpen={statusModalOpen} onClose={() => setStatusModalOpen(false)} />
    </>
  );
};
