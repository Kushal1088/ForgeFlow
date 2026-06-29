import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, Building, Mail, Lock, User, CheckSquare, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { WelcomeWizard } from '../../components/common/WelcomeWizard';

export const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showWizard, setShowWizard] = useState(false);

  const { registerOrganization } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !workEmail || !orgName || !password) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!acceptedTerms) {
      setErrorMsg('Please accept the Terms of Service & Privacy Policy.');
      return;
    }

    setErrorMsg('');
    registerOrganization(orgName, workEmail, password);
    setShowWizard(true);
  };

  const handleFinishWizard = () => {
    setShowWizard(false);
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-[#12131a] flex flex-col items-center justify-center p-4 select-none relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#6366f1]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg space-y-6 relative z-10 animate-fadeIn my-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/welcome" className="inline-block">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8083ff] flex items-center justify-center shadow-glow mx-auto mb-2">
              <Zap className="w-7 h-7 text-white fill-current" />
            </div>
          </Link>
          <h1 className="text-2xl font-heading font-bold text-white tracking-tight">Create Enterprise Workspace</h1>
          <p className="text-xs text-[#908fa0] font-mono">Provision a new organization and become Organization Owner</p>
        </div>

        {/* Form Card */}
        <div className="bg-[#1e1f26] border border-[#464554]/60 rounded-2xl p-8 shadow-2xl space-y-6">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 font-mono">
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-mono uppercase text-[#908fa0] block mb-1.5">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Alex Mercer"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#12131a] border border-[#464554]/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#6366f1] pl-10"
                    required
                  />
                  <User className="w-4 h-4 text-[#908fa0] absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-[#908fa0] block mb-1.5">Work Email</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="owner@company.com"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    className="w-full bg-[#12131a] border border-[#464554]/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#6366f1] pl-10"
                    required
                  />
                  <Mail className="w-4 h-4 text-[#908fa0] absolute left-3.5 top-3" />
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-[#908fa0] block mb-1.5">Organization / Workspace Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Acme Global Corp"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full bg-[#12131a] border border-[#464554]/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#6366f1] pl-10"
                  required
                />
                <Building className="w-4 h-4 text-[#6366f1] absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-mono uppercase text-[#908fa0] block mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#12131a] border border-[#464554]/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#6366f1] pl-10"
                    required
                  />
                  <Lock className="w-4 h-4 text-[#908fa0] absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-[#908fa0] block mb-1.5">Confirm Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#12131a] border border-[#464554]/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#6366f1] pl-10"
                    required
                  />
                  <Lock className="w-4 h-4 text-[#908fa0] absolute left-3.5 top-3" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-4 h-4 rounded bg-[#12131a] border-[#464554] text-[#6366f1] focus:ring-0 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-[#908fa0] cursor-pointer">
                I accept the <span className="text-white hover:underline">Terms of Service</span> and <span className="text-white hover:underline">Privacy Policy</span>.
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#6366f1] hover:bg-[#8083ff] text-white py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-glow transition-all pt-3.5"
            >
              Create Workspace <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-[#464554]/30 text-center text-xs text-[#908fa0]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#6366f1] font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>

        <div className="text-center text-[11px] text-[#908fa0] font-mono">
          Designed & Developed by <strong className="text-white">Kushal Pandey</strong>
        </div>
      </div>

      <WelcomeWizard isOpen={showWizard} onClose={handleFinishWizard} orgName={orgName} />
    </div>
  );
};
