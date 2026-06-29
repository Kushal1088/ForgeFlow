import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthConfirmModal } from '../../components/common/AuthConfirmModal';

export const OrgLoginPage = () => {
  const [email, setEmail] = useState('admin@forgeflow.io');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState('owner');
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const { loginOrgUser } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setConfirmModalOpen(true);
  };

  const executeLogin = () => {
    loginOrgUser(email, password, role);
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-[#12131a] flex flex-col items-center justify-center p-4 select-none relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#6366f1]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10 animate-fadeIn my-6">
        <div className="text-center space-y-2">
          <Link to="/welcome" className="inline-block">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8083ff] flex items-center justify-center shadow-glow mx-auto mb-2">
              <Zap className="w-7 h-7 text-white fill-current" />
            </div>
          </Link>
          <h1 className="text-2xl font-heading font-bold text-white tracking-tight">ForgeFlow SaaS Portal</h1>
          <p className="text-xs text-[#908fa0] font-mono">Sign in to your organization workspace</p>
        </div>

        <div className="bg-[#1e1f26] border border-[#464554]/60 rounded-2xl p-8 shadow-2xl space-y-6">
          {/* Social Logins */}
          <div className="space-y-2">
            <p className="text-[10px] font-mono uppercase text-[#908fa0] text-center mb-2">Single Sign-On (SSO)</p>
            <div className="grid grid-cols-3 gap-2">
              <button 
                type="button" 
                onClick={() => alert('OAuth SSO is coming soon in v2.5.')}
                className="bg-[#12131a] hover:bg-[#282a31] border border-[#464554]/60 p-2.5 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-mono text-[#908fa0] relative group transition-all"
              >
                <span className="text-white font-bold">Google</span>
                <span className="text-[8px] bg-[#6366f1]/20 text-[#c0c1ff] px-1 rounded">Soon</span>
              </button>

              <button 
                type="button" 
                onClick={() => alert('OAuth SSO is coming soon in v2.5.')}
                className="bg-[#12131a] hover:bg-[#282a31] border border-[#464554]/60 p-2.5 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-mono text-[#908fa0] relative group transition-all"
              >
                <span className="text-white font-bold">GitHub</span>
                <span className="text-[8px] bg-[#6366f1]/20 text-[#c0c1ff] px-1 rounded">Soon</span>
              </button>

              <button 
                type="button" 
                onClick={() => alert('OAuth SSO is coming soon in v2.5.')}
                className="bg-[#12131a] hover:bg-[#282a31] border border-[#464554]/60 p-2.5 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-mono text-[#908fa0] relative group transition-all"
              >
                <span className="text-white font-bold">Microsoft</span>
                <span className="text-[8px] bg-[#6366f1]/20 text-[#c0c1ff] px-1 rounded">Soon</span>
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-[#464554]/40"></div>
            <span className="flex-shrink mx-4 text-[10px] font-mono text-[#908fa0] uppercase">Or Password Login</span>
            <div className="flex-grow border-t border-[#464554]/40"></div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-mono uppercase text-[#908fa0] block mb-1.5">Work Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#12131a] border border-[#464554]/60 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#6366f1] pl-10"
                  required
                />
                <Mail className="w-4 h-4 text-[#908fa0] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-[#908fa0] block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#12131a] border border-[#464554]/60 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#6366f1] pl-10"
                  required
                />
                <Lock className="w-4 h-4 text-[#908fa0] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-[#908fa0] block mb-1.5">Simulate Role Login</label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#12131a] border border-[#464554]/60 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#6366f1] pl-10 capitalize"
                >
                  <option value="owner">Owner (Full Permissions)</option>
                  <option value="admin">Admin (Team Management)</option>
                  <option value="builder">Builder (Workflow Creator)</option>
                  <option value="member">Member (Executor)</option>
                  <option value="viewer">Viewer (Read Only)</option>
                </select>
                <UserCheck className="w-4 h-4 text-[#6366f1] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#6366f1] hover:bg-[#8083ff] text-white py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-glow transition-all pt-3.5"
            >
              Sign In to Workspace <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-[#464554]/30 text-center text-xs text-[#908fa0]">
            Need to register a new Organization?{' '}
            <Link to="/signup" className="text-[#6366f1] font-semibold hover:underline">
              Create Tenant
            </Link>
          </div>
        </div>

        <div className="text-center text-[11px] text-[#908fa0] font-mono pt-2">
          Designed & Developed by <strong className="text-white">Kushal Pandey</strong>
        </div>
      </div>

      <AuthConfirmModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={executeLogin}
        title="Confirm Workspace Sign In?"
        message={`Are you sure you want to authenticate as ${email} (${role.toUpperCase()} role)?`}
        actionType="login"
      />
    </div>
  );
};
