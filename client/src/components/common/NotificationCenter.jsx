import React, { useState } from 'react';
import { Bell, X, CheckCircle2, AlertTriangle, Zap, Check } from 'lucide-react';

export const NotificationCenter = ({ isOpen, onClose }) => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'approval', title: 'Approval Required', message: 'VP Finance sign-off requested for PO #8492 ($12,500)', time: '10m ago', unread: true },
    { id: 2, type: 'system', title: 'Workflow Executed', message: 'Employee HR Onboarding graph completed successfully', time: '1h ago', unread: true },
    { id: 3, type: 'security', title: 'New Member Joined', message: 'Marcus Vance joined organization as Builder', time: '3h ago', unread: false },
  ]);

  if (!isOpen) return null;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const filtered = notifications.filter(n => filter === 'all' || (filter === 'unread' && n.unread));

  return (
    <div className="fixed inset-y-0 right-0 w-80 sm:w-96 bg-[#1e1f26] border-l border-[#464554] shadow-2xl z-50 flex flex-col animate-slideLeft">
      {/* Drawer Header */}
      <div className="p-4 border-b border-[#464554]/40 flex items-center justify-between bg-[#12131a]">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#6366f1]" />
          <h3 className="text-sm font-heading font-bold text-white">Platform Notifications</h3>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={markAllRead} title="Mark all as read" className="text-[10px] font-mono text-[#6366f1] hover:underline">
            Mark all read
          </button>
          <button onClick={onClose} className="text-[#908fa0] hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-2 border-b border-[#464554]/30 flex gap-2 bg-[#1a1b22]">
        <button 
          onClick={() => setFilter('all')}
          className={`px-2.5 py-1 rounded text-[10px] font-mono ${filter === 'all' ? 'bg-[#6366f1] text-white' : 'text-[#908fa0] hover:text-white'}`}
        >
          All ({notifications.length})
        </button>
        <button 
          onClick={() => setFilter('unread')}
          className={`px-2.5 py-1 rounded text-[10px] font-mono ${filter === 'unread' ? 'bg-[#6366f1] text-white' : 'text-[#908fa0] hover:text-white'}`}
        >
          Unread ({notifications.filter(n => n.unread).length})
        </button>
      </div>

      {/* Notifications Roster */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-[#464554]/20">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#908fa0]">No notifications.</div>
        ) : (
          filtered.map((item) => (
            <div key={item.id} className={`pt-3 flex items-start gap-3 ${item.unread ? 'opacity-100' : 'opacity-70'}`}>
              <div className="w-8 h-8 rounded-lg bg-[#12131a] border border-[#464554]/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                {item.type === 'approval' ? <AlertTriangle className="w-4 h-4 text-amber-400" /> : <Zap className="w-4 h-4 text-[#6366f1]" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                  <span className="text-[10px] font-mono text-[#908fa0]">{item.time}</span>
                </div>
                <p className="text-[11px] text-[#908fa0] mt-0.5 leading-tight">{item.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
