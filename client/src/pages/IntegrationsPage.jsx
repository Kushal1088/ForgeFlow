import React, { useState } from 'react';
import { Layers, CheckCircle2, Plus, ArrowRight, Plug, ExternalLink, Bot, Sparkles } from 'lucide-react';

export const IntegrationsPage = () => {
  const [connectors, setConnectors] = useState([
    { id: 'gemini', name: 'Google Gemini AI', category: 'AI & LLM Engines', status: 'connected', desc: 'Power workflow graphs with Gemini 1.5 Pro multimodal prompt processing and automated reasoning.' },
    { id: 'openai', name: 'OpenAI GPT-4o', category: 'AI & LLM Engines', status: 'connected', desc: 'Integrate GPT-4o language completion nodes and structured JSON extraction steps.' },
    { id: 'anthropic', name: 'Anthropic Claude 3.5', category: 'AI & LLM Engines', status: 'connected', desc: 'Execute Claude 3.5 Sonnet analysis for complex document parsing and code synthesis.' },
    { id: 'slack', name: 'Slack Workspace', category: 'Communication', status: 'connected', desc: 'Send workflow notifications & approvals directly to Slack channels.' },
    { id: 'github', name: 'GitHub Webhooks', category: 'Developer Tools', status: 'connected', desc: 'Trigger workflow graphs on pull request events or deployment status.' },
    { id: 'webhook', name: 'Custom HTTP Webhooks', category: 'Core API', status: 'connected', desc: 'Inbound and outbound REST JSON webhook listeners.' },
    { id: 'gdrive', name: 'Google Drive & Workspace', category: 'Cloud Storage', status: 'available', desc: 'Upload exported workflow reports directly to Google Cloud Storage.' },
    { id: 'zapier', name: 'Zapier Connector', category: 'Automation Engine', status: 'available', desc: 'Connect ForgeFlow triggers to 5,000+ third-party apps.' },
    { id: 'n8n', name: 'n8n Workflow Node', category: 'Automation Engine', status: 'available', desc: 'Self-hosted open-source workflow execution bridge.' }
  ]);

  const toggleConnect = (id) => {
    setConnectors(connectors.map(c => c.id === id ? { ...c, status: c.status === 'connected' ? 'available' : 'connected' } : c));
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 animate-fadeIn select-none overflow-x-hidden">
      <div className="pb-6 border-b border-[#464554]/40 flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-2">
            Enterprise Connectors & AI Engines
          </h1>
          <p className="text-xs sm:text-sm text-[#908fa0] mt-1">Connect AI LLM models and external SaaS ecosystems to your workflow automation graphs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {connectors.map((item) => (
          <div key={item.id} className="bg-[#1e1f26] border border-[#464554]/40 hover:border-[#6366f1]/60 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all group">
            <div>
              <div className="flex items-center justify-between mb-3 gap-2">
                <span className="text-[10px] font-mono uppercase text-[#908fa0] bg-[#12131a] px-2 py-0.5 rounded border border-[#464554]/40 truncate">
                  {item.category}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold border flex-shrink-0 ${
                  item.status === 'connected' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                    : 'bg-[#464554]/20 text-[#908fa0] border-[#464554]/40'
                }`}>
                  {item.status}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
                {item.category.includes('AI') ? <Bot className="w-4 h-4 text-[#6366f1] flex-shrink-0" /> : <Plug className="w-4 h-4 text-[#6366f1] flex-shrink-0" />} 
                <span className="truncate">{item.name}</span>
              </h3>
              <p className="text-xs text-[#908fa0] leading-relaxed mb-4">{item.desc}</p>
            </div>

            <div className="pt-4 border-t border-[#464554]/30 flex items-center justify-end">
              <button
                onClick={() => toggleConnect(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all w-full sm:w-auto justify-center ${
                  item.status === 'connected'
                    ? 'bg-[#12131a] text-[#908fa0] border border-[#464554] hover:text-red-400'
                    : 'bg-[#6366f1] hover:bg-[#8083ff] text-white shadow-glow'
                }`}
              >
                {item.status === 'connected' ? 'Disconnect' : 'Configure Connector'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
