import React, { useState, useEffect } from 'react';
import { Search, Workflow, PlaySquare, ShieldCheck, Settings, X, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { name: 'AI Copilot Intelligence Core', category: 'AI Engine', icon: Sparkles, action: () => navigate('/app/copilot') },
    { name: 'Create New Workflow', category: 'Workflows', icon: Workflow, action: () => navigate('/app/workflows') },
    { name: 'View Active Execution Runs', category: 'Executions', icon: PlaySquare, action: () => navigate('/app/executions') },
    { name: 'Security & Audit Trail', category: 'Audit', icon: ShieldCheck, action: () => navigate('/app/audit-logs') },
    { name: 'Manage Team Roles (RBAC)', category: 'Settings', icon: Settings, action: () => navigate('/app/settings') },
  ];

  const filtered = actions.filter(a => a.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center pt-24 p-4 animate-fadeIn">
      <div className="bg-[#1e1f26] border border-[#464554] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
        {/* Search Header */}
        <div className="p-4 border-b border-[#464554]/40 flex items-center gap-3 bg-[#12131a]">
          <Search className="w-5 h-5 text-[#6366f1]" />
          <input
            type="text"
            placeholder="Type a command or search platform workflows (Ctrl + K)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-white placeholder-[#908fa0] text-sm focus:outline-none font-sans"
          />
          <button onClick={() => onClose(false)} className="text-[#908fa0] hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          <p className="text-[10px] font-mono text-[#908fa0] uppercase px-3 py-1">Quick Navigation & Commands</p>
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-[#908fa0]">No commands found for "{query}"</div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => { item.action(); onClose(false); }}
                  className="w-full px-3 py-2.5 rounded-lg flex items-center justify-between text-left text-xs hover:bg-[#282a31] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#12131a] border border-[#464554]/50 flex items-center justify-center text-[#6366f1] group-hover:border-[#6366f1]">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[#e2e1eb] font-semibold group-hover:text-white">{item.name}</p>
                      <p className="text-[10px] text-[#908fa0] font-mono">{item.category}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#908fa0] group-hover:text-[#6366f1] transition-transform group-hover:translate-x-1" />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
