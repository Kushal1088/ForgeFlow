import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Command, User, ShieldCheck, HelpCircle, Sun, Moon, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { CommandPalette } from '../common/CommandPalette';
import { KeyboardShortcutsModal } from '../common/KeyboardShortcutsModal';
import { NotificationCenter } from '../common/NotificationCenter';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, logoutOrgUser, theme, toggleTheme } = useAuth();
  const [cmdOpen, setCmdOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    logoutOrgUser();
    navigate('/?logout=true');
  };

  return (
    <>
      <header className="h-16 bg-[#1e1f26]/80 backdrop-blur-md border-b border-[#464554]/40 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 select-none">
        {/* Command Palette Trigger */}
        <div className="flex items-center gap-4 flex-1 max-w-md ml-14 md:ml-0">
          <button
            onClick={() => setCmdOpen(true)}
            className="w-full bg-[#12131a] hover:bg-[#282a31] border border-[#464554]/50 rounded-xl px-3 py-1.5 sm:px-3.5 sm:py-2 flex items-center justify-between text-xs text-[#908fa0] transition-all group shadow-inner"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#908fa0] group-hover:text-[#6366f1] transition-colors flex-shrink-0" />
              <span className="truncate text-[11px] sm:text-xs">Search workflows or Ctrl+K...</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 bg-[#282a31] px-2 py-0.5 rounded text-[10px] font-mono text-[#e2e1eb] border border-[#464554]/40">
              <Command className="w-3 h-3" /> K
            </div>
          </button>
        </div>

        {/* Right Section: Theme Toggle, Shortcuts, Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 ml-2">
          {/* Light / Dark Theme Button */}
          <button 
            onClick={toggleTheme}
            title="Toggle Light / Dark Theme"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#12131a] border border-[#464554]/50 flex items-center justify-center text-[#908fa0] hover:text-white hover:border-[#6366f1] transition-colors flex-shrink-0"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#6366f1]" />}
          </button>

          <button 
            onClick={() => setShortcutsOpen(true)}
            title="Keyboard Shortcuts"
            className="hidden sm:flex w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#12131a] border border-[#464554]/50 items-center justify-center text-[#908fa0] hover:text-white hover:border-[#6366f1] transition-colors flex-shrink-0"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Realtime Notifications Bell Trigger */}
          <button 
            onClick={() => setNotifOpen(!notifOpen)}
            title="Realtime Alerts"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#12131a] border border-[#464554]/50 flex items-center justify-center text-[#908fa0] hover:text-white hover:border-[#6366f1] transition-colors relative flex-shrink-0"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#6366f1] animate-pulse" />
          </button>

          {/* User Profile Badge & Dropdown */}
          <div className="relative pl-2 sm:pl-3 border-l border-[#464554]/40 flex-shrink-0">
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 sm:gap-3 p-1 rounded-xl hover:bg-[#282a31] transition-colors text-left"
            >
              <img 
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
                alt={user?.name || 'User'} 
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover border border-[#6366f1]/50"
              />
              <div className="hidden lg:block">
                <p className="text-xs font-semibold text-[#e2e1eb] leading-tight">{user?.name || 'User'}</p>
                <div className="flex items-center gap-1 text-[10px] font-mono text-[#908fa0]">
                  <ShieldCheck className="w-3 h-3 text-[#6366f1]" />
                  <span className="capitalize">{user?.role || 'Member'}</span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#908fa0]" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 top-12 w-48 bg-[#1e1f26] border border-[#464554] rounded-xl shadow-2xl p-1.5 z-50 animate-fadeIn">
                <div className="px-3 py-2 border-b border-[#464554]/40 mb-1">
                  <p className="text-xs font-bold text-white">{user?.name || 'User'}</p>
                  <p className="text-[10px] text-[#908fa0] truncate">{user?.email || 'user@forgeflow.io'}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/15 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <CommandPalette isOpen={cmdOpen} onClose={setCmdOpen} />
      <KeyboardShortcutsModal isOpen={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
      <NotificationCenter isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
    </>
  );
};
