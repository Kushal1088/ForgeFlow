import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, Building2, ShieldCheck, ArrowRight, Layers } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#12131a] flex flex-col items-center justify-center p-4 select-none relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#6366f1]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl space-y-6 relative z-10 animate-fadeIn">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/welcome" className="inline-block">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8083ff] flex items-center justify-center shadow-glow mx-auto mb-2">
              <Zap className="w-7 h-7 text-white fill-current" />
            </div>
          </Link>
          <h1 className="text-2xl font-heading font-bold text-white tracking-tight">Select Authentication Portal</h1>
          <p className="text-xs text-[#908fa0] font-mono">Choose your designated workspace portal to continue</p>
        </div>

        {/* Workspace Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option 1: Organization Workspace */}
          <div className="bg-[#1e1f26] border border-[#464554]/60 hover:border-[#6366f1]/60 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-2xl transition-all group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#6366f1]/20 text-[#6366f1] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-heading font-bold text-white group-hover:text-[#6366f1] transition-colors">
                Organization Workspace
              </h3>
              <p className="text-xs text-[#908fa0] leading-relaxed">
                Sign in to your company's ForgeFlow workspace. Supports Owner, Admin, Builder, Member, and Viewer roles.
              </p>
            </div>
            <button
              onClick={() => navigate('/app/login')}
              className="w-full bg-[#6366f1] hover:bg-[#8083ff] text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-glow transition-all"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Option 2: Platform Administration */}
          <div className="bg-[#12131a] border border-purple-500/40 hover:border-purple-500/80 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-2xl transition-all group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-heading font-bold text-white group-hover:text-purple-400 transition-colors">
                Platform Administration
              </h3>
              <p className="text-xs text-[#908fa0] leading-relaxed">
                Only for ForgeFlow Platform Administrators and Platform Owner (Kushal Pandey).
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/login')}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              Admin Login <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-4 text-center text-xs text-[#908fa0]">
          Don't have a workspace?{' '}
          <Link to="/signup" className="text-[#6366f1] font-semibold hover:underline">
            Create Account
          </Link>
        </div>

        <div className="text-center text-[11px] text-[#908fa0] font-mono pt-2">
          Designed & Developed by <strong className="text-white">Kushal Pandey</strong>
        </div>
      </div>
    </div>
  );
};
