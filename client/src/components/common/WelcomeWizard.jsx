import React, { useState } from 'react';
import { 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Upload, 
  Palette, 
  Mail, 
  Plus, 
  Rocket, 
  Compass,
  X,
  Layers
} from 'lucide-react';

export const WelcomeWizard = ({ isOpen, onClose, orgName = "Acme Corp" }) => {
  const [step, setStep] = useState(1);
  const [brandColor, setBrandColor] = useState('#6366f1');
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitedList, setInvitedList] = useState([]);

  if (!isOpen) return null;

  const totalSteps = 4;

  const addInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setInvitedList([...invitedList, inviteEmail]);
    setInviteEmail('');
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn select-none">
      <div className="bg-[#1e1f26] border border-[#6366f1]/50 rounded-2xl max-w-lg w-full p-8 space-y-6 shadow-glow relative overflow-hidden">
        {/* Top Header & Step Progress */}
        <div className="flex items-center justify-between border-b border-[#464554]/40 pb-4">
          <div className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-[#6366f1]" />
            <span className="text-xs font-heading font-bold text-white">Workspace Setup Wizard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-[#908fa0]">Step {step} of {totalSteps}</span>
            <button onClick={onClose} className="text-xs text-[#908fa0] hover:text-white font-mono">Resume Later</button>
          </div>
        </div>

        {/* Step 1: Branding & Customization */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Brand Your Workspace</h3>
              <p className="text-xs text-[#908fa0]">Customize logos and color themes for {orgName}.</p>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="text-[10px] font-mono uppercase text-[#908fa0] block mb-1">Organization Logo</label>
                <div className="border-2 border-dashed border-[#464554] rounded-xl p-4 text-center hover:border-[#6366f1] transition-colors cursor-pointer bg-[#12131a]">
                  <Upload className="w-5 h-5 text-[#6366f1] mx-auto mb-1" />
                  <p className="text-xs text-[#e2e1eb]">Drag logo or click to browse</p>
                  <p className="text-[10px] text-[#908fa0]">PNG, SVG or JPG up to 5MB</p>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-[#908fa0] block mb-1">Primary Brand Accent Color</label>
                <div className="flex items-center gap-3 bg-[#12131a] p-3 rounded-xl border border-[#464554]/40">
                  <input 
                    type="color" 
                    value={brandColor} 
                    onChange={(e) => setBrandColor(e.target.value)} 
                    className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-white">{brandColor}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Team Invitation */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Invite Team Members</h3>
              <p className="text-xs text-[#908fa0]">Add colleagues to collaborate on workflows.</p>
            </div>

            <form onSubmit={addInvite} className="flex gap-2">
              <input
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="flex-1 bg-[#12131a] border border-[#464554]/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#6366f1]"
              />
              <button type="submit" className="bg-[#6366f1] hover:bg-[#8083ff] text-white px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add
              </button>
            </form>

            {invitedList.length > 0 && (
              <div className="bg-[#12131a] p-3 rounded-xl border border-[#464554]/40 space-y-1 max-h-32 overflow-y-auto">
                {invitedList.map((email, idx) => (
                  <div key={idx} className="text-xs font-mono text-[#c0c1ff] flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#6366f1]" /> {email}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 3: First Workflow Template */}
        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Select Starter Template</h3>
              <p className="text-xs text-[#908fa0]">Bootstrap your first automated execution pipeline.</p>
            </div>

            <div className="space-y-2">
              <div className="bg-[#12131a] border border-[#6366f1] p-3.5 rounded-xl flex items-center justify-between cursor-pointer">
                <div>
                  <h4 className="text-xs font-bold text-white">Enterprise Purchase Order Sign-off</h4>
                  <p className="text-[10px] text-[#908fa0]">Automated procurement with Slack & email notifications.</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-[#6366f1]" />
              </div>
              <div className="bg-[#12131a] border border-[#464554]/40 p-3.5 rounded-xl flex items-center justify-between cursor-pointer hover:border-[#464554]">
                <div>
                  <h4 className="text-xs font-bold text-white">Employee HR Onboarding</h4>
                  <p className="text-[10px] text-[#908fa0]">Automatic account provisioning upon new hire registration.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Interactive Product Tour */}
        {step === 4 && (
          <div className="space-y-4 animate-fadeIn text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
              <Compass className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">You're All Set!</h3>
            <p className="text-xs text-[#908fa0] max-w-xs mx-auto leading-relaxed">
              Your organization workspace is fully configured. Launch into your dashboard to start building visual workflows.
            </p>
          </div>
        )}

        {/* Navigation Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#464554]/30">
          <div>
            {step > 1 ? (
              <button 
                onClick={() => setStep(step - 1)} 
                className="text-xs text-[#908fa0] hover:text-white flex items-center gap-1 font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            ) : (
              <button onClick={onClose} className="text-xs text-[#908fa0] hover:text-white font-semibold">
                Skip Setup
              </button>
            )}
          </div>

          <div>
            {step < totalSteps ? (
              <button 
                onClick={() => setStep(step + 1)} 
                className="bg-[#6366f1] hover:bg-[#8083ff] text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-glow transition-all"
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={onClose} 
                className="bg-gradient-to-r from-[#6366f1] to-[#8083ff] hover:opacity-90 text-white px-6 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-glow transition-all"
              >
                Launch Workspace <Zap className="w-4 h-4 fill-current" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
