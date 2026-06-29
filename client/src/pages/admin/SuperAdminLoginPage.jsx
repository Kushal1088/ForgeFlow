import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Zap, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SuperAdminLoginPage = () => {
  const [email, setEmail] = useState('kushal@forgeflow.io');
  const [password, setPassword] = useState('••••••••••••');
  const { loginSuperAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginSuperAdmin(email, password);
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#090a0f] flex flex-col items-center justify-center p-4 select-none relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#6366f1]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10 animate-fadeIn">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8083ff] flex items-center justify-center shadow-glow mx-auto mb-3">
            <Zap className="w-7 h-7 text-white fill-current" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-white tracking-tight flex items-center justify-center gap-2">
            ForgeFlow Console
            <span className="text-[10px] font-mono bg-[#6366f1]/20 text-[#c0c1ff] border border-[#6366f1]/40 px-2 py-0.5 rounded">
              Super Admin
            </span>
          </h1>
          <p className="text-xs text-[#908fa0] font-mono">Platform Control Portal for Platform Administrator (Kushal Pandey)</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-[#12131a] border border-[#464554]/60 rounded-2xl p-8 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-mono uppercase text-[#908fa0] block mb-1.5">Super Admin ID</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1e1f26] border border-[#464554]/60 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#6366f1] pl-10"
                />
                <ShieldCheck className="w-4 h-4 text-[#6366f1] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-[#908fa0] block mb-1.5">Security Access Code</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1e1f26] border border-[#464554]/60 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#6366f1] pl-10"
                />
                <Lock className="w-4 h-4 text-[#908fa0] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#6366f1] to-[#8083ff] hover:opacity-90 text-white py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-glow transition-all pt-3.5"
            >
              Authenticate Platform Console <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Developer Credit Footer */}
        <div className="text-center text-[11px] text-[#908fa0] font-mono pt-4">
          Designed & Developed by <strong className="text-white">Kushal Pandey</strong>
        </div>
      </div>
    </div>
  );
};
