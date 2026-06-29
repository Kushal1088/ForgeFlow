import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, Building, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const OrgRegisterPage = () => {
  const [orgName, setOrgName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { registerOrganization } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orgName || !email) return;
    registerOrganization(orgName, email, password);
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-[#12131a] flex flex-col items-center justify-center p-4 select-none relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#6366f1]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10 animate-fadeIn">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8083ff] flex items-center justify-center shadow-glow mx-auto mb-3">
            <Zap className="w-7 h-7 text-white fill-current" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-white tracking-tight">Create Organization Tenant</h1>
          <p className="text-xs text-[#908fa0] font-mono">Register as Organization Owner to setup platform building</p>
        </div>

        <div className="bg-[#1e1f26] border border-[#464554]/60 rounded-2xl p-8 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-mono uppercase text-[#908fa0] block mb-1.5">Organization Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Acme Global Inc"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full bg-[#12131a] border border-[#464554]/60 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#6366f1] pl-10"
                  required
                />
                <Building className="w-4 h-4 text-[#6366f1] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-[#908fa0] block mb-1.5">Owner Work Email</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="owner@company.com"
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
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#12131a] border border-[#464554]/60 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#6366f1] pl-10"
                  required
                />
                <Lock className="w-4 h-4 text-[#908fa0] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#6366f1] hover:bg-[#8083ff] text-white py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-glow transition-all pt-3.5"
            >
              Provision Organization <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-[#464554]/30 text-center text-xs text-[#908fa0]">
            Already have an organization?{' '}
            <Link to="/app/login" className="text-[#6366f1] font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>

        <div className="text-center text-[11px] text-[#908fa0] font-mono pt-2">
          Designed & Developed by <strong className="text-white">Kushal Pandey</strong>
        </div>
      </div>
    </div>
  );
};
