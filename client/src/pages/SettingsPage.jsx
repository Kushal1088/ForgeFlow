import React, { useState } from 'react';
import { Users, ShieldCheck, Mail, Plus, CheckCircle2, Building, Palette, Key, CreditCard, Code2, Cpu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SettingsPage = () => {
  const { currentOrg, setCurrentOrg } = useAuth();
  const [activeTab, setActiveTab] = useState('members');
  
  // Organization Branding state
  const [brandName, setBrandName] = useState(currentOrg.name);
  const [primaryColor, setPrimaryColor] = useState('#6366f1');

  // API Keys state
  const [apiKeys, setApiKeys] = useState([
    { id: 'key_live_9482', name: 'Production Backend Server', secret: 'ff_live_sk_94827163948271', created: '2026-06-01' }
  ]);

  // Members state
  const [members, setMembers] = useState([
    { id: 'usr_1', name: 'Alex Mercer', email: 'admin@forgeflow.io', role: 'owner', status: 'active' },
    { id: 'usr_2', name: 'Elena Rostova', email: 'elena@acmeglobal.com', role: 'admin', status: 'active' },
    { id: 'usr_3', name: 'Marcus Vance', email: 'marcus@acmeglobal.com', role: 'builder', status: 'active' }
  ]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');

  const handleInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setMembers([...members, {
      id: `usr_${Date.now()}`,
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      status: 'invited'
    }]);
    setInviteEmail('');
  };

  const generateApiKey = () => {
    setApiKeys([...apiKeys, {
      id: `key_live_${Date.now().toString().slice(-4)}`,
      name: 'New Custom Integrator Key',
      secret: `ff_live_sk_${Date.now()}${Math.random().toString(36).substring(2, 7)}`,
      created: new Date().toISOString().split('T')[0]
    }]);
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 animate-fadeIn select-none overflow-x-hidden">
      <div className="pb-6 border-b border-[#464554]/40">
        <h1 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-2">
          Organization Settings & Administration
        </h1>
        <p className="text-xs sm:text-sm text-[#908fa0] mt-1">Manage tenant branding, team member roles (RBAC), API keys, and platform specs.</p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex gap-2 border-b border-[#464554]/30 pb-3 overflow-x-auto no-scrollbar max-w-full">
        <button
          onClick={() => setActiveTab('members')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all flex-shrink-0 ${
            activeTab === 'members' ? 'bg-[#6366f1] text-white shadow-glow' : 'text-[#908fa0] hover:text-white hover:bg-[#1e1f26]'
          }`}
        >
          <Users className="w-4 h-4" /> Members & RBAC
        </button>
        <button
          onClick={() => setActiveTab('branding')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all flex-shrink-0 ${
            activeTab === 'branding' ? 'bg-[#6366f1] text-white shadow-glow' : 'text-[#908fa0] hover:text-white hover:bg-[#1e1f26]'
          }`}
        >
          <Palette className="w-4 h-4" /> Branding & Styling
        </button>
        <button
          onClick={() => setActiveTab('apikeys')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all flex-shrink-0 ${
            activeTab === 'apikeys' ? 'bg-[#6366f1] text-white shadow-glow' : 'text-[#908fa0] hover:text-white hover:bg-[#1e1f26]'
          }`}
        >
          <Key className="w-4 h-4" /> API Keys & Tokens
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all flex-shrink-0 ${
            activeTab === 'about' ? 'bg-[#6366f1] text-white shadow-glow' : 'text-[#908fa0] hover:text-white hover:bg-[#1e1f26]'
          }`}
        >
          <Code2 className="w-4 h-4" /> About System
        </button>
      </div>

      {/* Tab 1: Members & RBAC */}
      {activeTab === 'members' && (
        <div className="space-y-6">
          <div className="bg-[#1e1f26] border border-[#464554]/40 rounded-2xl p-4 sm:p-6 space-y-4">
            <h3 className="text-sm sm:text-base font-heading font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#6366f1]" /> Invite Team Member
            </h3>
            <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="flex-1 bg-[#12131a] border border-[#464554]/60 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#908fa0] focus:outline-none focus:border-[#6366f1]"
              />
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                className="bg-[#12131a] border border-[#464554]/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none capitalize"
              >
                <option value="admin">Admin</option>
                <option value="builder">Builder</option>
                <option value="member">Member</option>
                <option value="viewer">Viewer</option>
              </select>
              <button 
                type="submit"
                className="bg-[#6366f1] hover:bg-[#8083ff] text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-glow transition-all"
              >
                <Plus className="w-4 h-4" /> Send Invite
              </button>
            </form>
          </div>

          <div className="bg-[#1e1f26] border border-[#464554]/40 rounded-2xl overflow-x-auto shadow-xl">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-[#464554]/40 text-[10px] font-mono uppercase text-[#908fa0] bg-[#12131a]/50">
                  <th className="py-3 px-4 sm:px-6">User</th>
                  <th className="py-3 px-4 sm:px-6">Role</th>
                  <th className="py-3 px-4 sm:px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#464554]/30 text-xs">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-[#282a31]/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-white">
                      <p className="leading-tight">{member.name}</p>
                      <p className="text-[11px] font-mono font-normal text-[#908fa0]">{member.email}</p>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase font-semibold border ${
                        member.role === 'owner' 
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' 
                          : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                      }`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {member.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Organization Branding */}
      {activeTab === 'branding' && (
        <div className="bg-[#1e1f26] border border-[#464554]/40 rounded-2xl p-4 sm:p-6 space-y-6 max-w-2xl">
          <h3 className="text-base font-heading font-bold text-white">Organization Visual Customization</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono text-[#908fa0] block mb-1">Company Name</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => { setBrandName(e.target.value); setCurrentOrg({ ...currentOrg, name: e.target.value }); }}
                className="w-full bg-[#12131a] border border-[#464554]/60 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#6366f1]"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-[#908fa0] block mb-1">Primary Accent Brand Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                />
                <span className="text-xs font-mono text-white">{primaryColor}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: API Keys */}
      {activeTab === 'apikeys' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#1e1f26] border border-[#464554]/40 rounded-2xl p-4 sm:p-6">
            <div>
              <h3 className="text-base font-heading font-bold text-white">Organization API Keys</h3>
              <p className="text-xs text-[#908fa0]">Secret keys for triggering backend workflows via REST endpoints.</p>
            </div>
            <button 
              onClick={generateApiKey}
              className="bg-[#6366f1] hover:bg-[#8083ff] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-glow transition-all w-full sm:w-auto justify-center"
            >
              <Plus className="w-4 h-4" /> Generate Secret Key
            </button>
          </div>
          <div className="bg-[#1e1f26] border border-[#464554]/40 rounded-2xl overflow-x-auto shadow-xl">
            <table className="w-full text-left border-collapse min-w-[550px]">
              <thead>
                <tr className="border-b border-[#464554]/40 text-[10px] font-mono uppercase text-[#908fa0] bg-[#12131a]/50">
                  <th className="py-3 px-4 sm:px-6">Key Identifier</th>
                  <th className="py-3 px-4 sm:px-6">Secret Key Token</th>
                  <th className="py-3 px-4 sm:px-6">Created Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#464554]/30 text-xs">
                {apiKeys.map((k) => (
                  <tr key={k.id} className="hover:bg-[#282a31]/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-white">{k.name}</td>
                    <td className="py-3.5 px-4 sm:px-6 font-mono text-[#c0c1ff]">{k.secret}</td>
                    <td className="py-3.5 px-4 sm:px-6 font-mono text-[#908fa0]">{k.created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: About System */}
      {activeTab === 'about' && (
        <div className="bg-[#1e1f26] border border-[#464554]/40 rounded-2xl p-4 sm:p-6 space-y-6 max-w-2xl">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#6366f1]">System Specifications</span>
            <h3 className="text-base sm:text-lg font-heading font-bold text-white mt-0.5">ForgeFlow Platform v1.0.0</h3>
            <p className="text-xs text-[#908fa0]">Designed & Developed by Kushal Pandey</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-[#12131a] p-3 rounded-xl border border-[#464554]/30">
              <span className="text-[10px] text-[#908fa0] block">Developer</span>
              <span className="text-white font-bold">Kushal Pandey</span>
            </div>
            <div className="bg-[#12131a] p-3 rounded-xl border border-[#464554]/30">
              <span className="text-[10px] text-[#908fa0] block">Release Build</span>
              <span className="text-emerald-400 font-bold">2026.06.29 Enterprise</span>
            </div>
            <div className="bg-[#12131a] p-3 rounded-xl border border-[#464554]/30">
              <span className="text-[10px] text-[#908fa0] block">React Version</span>
              <span className="text-white">v18.3.1</span>
            </div>
            <div className="bg-[#12131a] p-3 rounded-xl border border-[#464554]/30">
              <span className="text-[10px] text-[#908fa0] block">Node / Express</span>
              <span className="text-white">v20.x / Express 4.21</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
