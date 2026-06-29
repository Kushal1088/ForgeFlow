import React, { useState } from 'react';
import { Sparkles, X, Bot, ArrowRight, CheckCircle2, Loader2, Wand2 } from 'lucide-react';

export const AICopilotModal = ({ isOpen, onClose, onGenerateWorkflow }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!prompt) return;
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      if (onGenerateWorkflow) {
        onGenerateWorkflow(prompt);
      }
      onClose();
    }, 1500);
  };

  const samplePrompts = [
    "Build a customer refund approval workflow over $500 with Slack notification.",
    "Automate new employee HR onboarding with account setup and welcome email.",
    "Extract sentiment from customer support ticket and assign high priority if negative."
  ];

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn select-none">
      <div className="bg-[#1e1f26] border border-[#6366f1]/60 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-glow relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#6366f1]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-[#464554]/40 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8083ff] flex items-center justify-center shadow-glow">
              <Bot className="w-4 h-4 text-white fill-current" />
            </div>
            <div>
              <h3 className="text-sm font-heading font-bold text-white flex items-center gap-1.5">
                ForgeFlow AI Copilot <span className="text-[9px] font-mono bg-[#6366f1]/20 text-[#c0c1ff] px-1.5 py-0.5 rounded">v3.0</span>
              </h3>
              <p className="text-[10px] text-[#908fa0]">Generate complete visual workflow graphs using natural language prompts</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#908fa0] hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="text-[10px] font-mono uppercase text-[#908fa0] block mb-1.5">Describe your workflow goal</label>
            <textarea
              rows="3"
              placeholder="e.g. Parse incoming webhook invoices, use AI to extract line items, and request CFO sign-off..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-[#12131a] border border-[#464554]/60 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#6366f1] resize-none"
              required
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase text-[#908fa0]">Or choose sample AI prompt</span>
            <div className="space-y-1">
              {samplePrompts.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(sample)}
                  className="w-full text-left p-2 rounded-lg bg-[#12131a] hover:bg-[#282a31] border border-[#464554]/30 text-[11px] text-[#c0c1ff] transition-all truncate flex items-center gap-1.5"
                >
                  <Wand2 className="w-3 h-3 text-[#6366f1] flex-shrink-0" />
                  <span className="truncate">{sample}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-[#6366f1] to-[#8083ff] hover:opacity-90 text-white py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-glow transition-all"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Synthesizing AI Workflow Graph...
              </>
            ) : (
              <>
                Generate AI Workflow <Sparkles className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
