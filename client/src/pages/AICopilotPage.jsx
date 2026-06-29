import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Bot, 
  Workflow, 
  Sliders, 
  Activity, 
  ShieldCheck, 
  Search, 
  FileText, 
  Zap, 
  Send, 
  RefreshCw, 
  Terminal, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Cpu,
  Database,
  Code,
  Copy,
  Check
} from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export const AICopilotPage = () => {
  const [activeModule, setActiveModule] = useState('workflow_generator');
  const [promptInput, setPromptInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'msg_welcome',
      sender: 'copilot',
      text: "Hello! I am your Enterprise AI Copilot. How can I assist you with automated workflows, form schemas, telemetry analysis, or system optimizations today?",
      module: 'general',
      artifact: null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [historyStats, setHistoryStats] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const modulesList = [
    { id: 'workflow_generator', name: 'AI Workflow Generator', icon: Workflow, desc: 'Synthesize DAG workflows from natural language', samplePrompt: 'Build a Stripe payment webhook pipeline with Manager Approval over $10k' },
    { id: 'form_generator', name: 'AI Form Generator', icon: Sliders, desc: 'Generate dynamic intake schemas and validation rules', samplePrompt: 'Generate a procurement intake form for hardware requests with department select' },
    { id: 'workflow_optimizer', name: 'AI Workflow Optimizer', icon: Zap, desc: 'Analyze DAG topologies for bottlenecks and SLA improvements', samplePrompt: 'Scan current purchase order approval workflow and suggest parallel executions' },
    { id: 'business_insights', name: 'AI Business Insights', icon: Activity, desc: 'Convert execution telemetry into executive summaries', samplePrompt: 'Analyze system throughput trends and average node latencies for executive report' },
    { id: 'error_analyzer', name: 'AI Error Analyzer', icon: AlertCircle, desc: 'Deconstruct execution failures & recommend 1-click fixes', samplePrompt: 'Explain execution failure #exec_1001 HTTP 504 gateway timeout' },
    { id: 'approval_summary', name: 'AI Approval Summary', icon: ShieldCheck, desc: 'Synthesize sign-off requests with automated risk scoring', samplePrompt: 'Summarize pending $12,500 PO purchase approval request for VP Finance' },
    { id: 'semantic_search', name: 'AI Semantic Search', icon: Search, desc: 'Natural language search across workflows, forms & logs', samplePrompt: 'Find all active workflows using Stripe webhook triggers and manager approvals' },
    { id: 'doc_generator', name: 'AI Doc Generator', icon: FileText, desc: 'Auto-generate Markdown specs, user guides & changelogs', samplePrompt: 'Generate technical documentation and SLA spec for Enterprise Purchase Order workflow' }
  ];

  const fetchHistory = () => {
    fetch(`${API_BASE_URL}/api/v1/copilot/history`)
      .then(res => res.json())
      .then(d => setHistoryStats(d))
      .catch(() => {});
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSelectModule = (mod) => {
    setActiveModule(mod.id);
    setPromptInput(mod.samplePrompt);
  };

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!promptInput.trim()) return;

    const userMsg = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: promptInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const currentPrompt = promptInput;
    setPromptInput('');
    setLoading(true);

    let endpoint = '/api/v1/copilot/generate-workflow';
    let bodyData = { prompt: currentPrompt };

    if (activeModule === 'form_generator') endpoint = '/api/v1/copilot/generate-form';
    else if (activeModule === 'workflow_optimizer') endpoint = '/api/v1/copilot/optimize-workflow';
    else if (activeModule === 'business_insights') endpoint = '/api/v1/copilot/business-insights';
    else if (activeModule === 'error_analyzer') endpoint = '/api/v1/copilot/analyze-error';
    else if (activeModule === 'approval_summary') endpoint = '/api/v1/copilot/approval-summary';
    else if (activeModule === 'semantic_search') endpoint = '/api/v1/copilot/semantic-search';
    else if (activeModule === 'doc_generator') endpoint = '/api/v1/copilot/generate-docs';

    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });
      const data = await res.json();

      const copilotMsg = {
        id: `copilot_${Date.now()}`,
        sender: 'copilot',
        text: data.message || 'Processed request successfully.',
        module: activeModule,
        artifact: data.workflow || data.form || data.recommendations || data.insights || data.analysis || data.summary || data.results || data.documentation,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, copilotMsg]);
      fetchHistory();
    } catch (err) {
      setMessages(prev => [...prev, {
        id: `copilot_err_${Date.now()}`,
        sender: 'copilot',
        text: 'Sorry, I encountered an issue connecting to the AI processing engine.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(typeof text === 'object' ? JSON.stringify(text, null, 2) : text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto animate-fadeIn text-left select-none">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#464554]/40 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#6366f1]/15 text-[#c0c1ff] border border-[#6366f1]/30 px-3 py-1 rounded-full text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#6366f1]" /> Enterprise AI Orchestration Core v2.4
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight flex items-center gap-2.5">
            ForgeFlow AI Copilot Workspace
          </h1>
          <p className="text-xs sm:text-sm text-[#908fa0]">
            Contextual AI agent integrated with DAG execution graphs, telemetry analytics, dynamic forms & enterprise RBAC.
          </p>
        </div>

        {/* System Stats Badge */}
        {historyStats && (
          <div className="flex items-center gap-3 bg-[#1e1f26] border border-[#464554]/50 p-3 rounded-2xl">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8083ff] flex items-center justify-center text-white shadow-glow">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                {historyStats.stats?.copilotStatus || 'Gemini Engine Active'}
              </p>
              <p className="text-[10px] text-[#908fa0] font-mono">
                Tokens Used: <strong className="text-[#c0c1ff]">{historyStats.stats?.totalTokens || 4850}</strong> • Avg Latency: <strong className="text-emerald-400">180ms</strong>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: 8 Specialized Modules */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-mono uppercase text-[#908fa0] px-1">Copilot Modules (8)</h3>
          <div className="space-y-2">
            {modulesList.map((mod) => {
              const Icon = mod.icon;
              const isActive = activeModule === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => handleSelectModule(mod)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                    isActive 
                      ? 'bg-[#6366f1]/20 border-[#6366f1] text-white shadow-glow' 
                      : 'bg-[#1e1f26] border-[#464554]/40 text-[#908fa0] hover:text-white hover:bg-[#282a31]'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl flex-shrink-0 ${isActive ? 'bg-[#6366f1] text-white' : 'bg-[#12131a] text-[#908fa0]'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold truncate text-white">{mod.name}</p>
                    <p className="text-[10px] text-[#908fa0] leading-snug line-clamp-2 mt-0.5">{mod.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Interactive Copilot Chat & Artifact Canvas */}
        <div className="lg:col-span-8 bg-[#1e1f26] border border-[#464554]/50 rounded-3xl p-4 sm:p-6 flex flex-col justify-between h-[680px] shadow-2xl relative overflow-hidden">
          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fadeIn`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {msg.sender === 'copilot' ? (
                    <span className="text-[10px] font-mono text-[#c0c1ff] flex items-center gap-1 bg-[#6366f1]/20 px-2 py-0.5 rounded border border-[#6366f1]/40">
                      <Sparkles className="w-3 h-3 text-[#6366f1]" /> ForgeFlow Copilot
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-[#908fa0]">You (Alex Mercer)</span>
                  )}
                  <span className="text-[9px] font-mono text-[#908fa0]">{msg.timestamp}</span>
                </div>

                <div
                  className={`p-4 rounded-2xl max-w-xl text-xs leading-relaxed space-y-3 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#6366f1] to-[#8083ff] text-white rounded-tr-none shadow-glow'
                      : 'bg-[#12131a] border border-[#464554]/50 text-[#e2e1eb] rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Rendered AI Artifact Preview Card */}
                  {msg.artifact && (
                    <div className="mt-3 p-3 bg-[#1e1f26] rounded-xl border border-[#464554]/60 space-y-2.5 text-left">
                      <div className="flex items-center justify-between border-b border-[#464554]/40 pb-2">
                        <span className="text-[10px] font-mono text-[#c0c1ff] uppercase flex items-center gap-1">
                          <Code className="w-3 h-3 text-[#6366f1]" /> Generated Artifact Output
                        </span>
                        <button
                          onClick={() => handleCopy(msg.artifact, idx)}
                          className="text-[10px] font-mono text-[#908fa0] hover:text-white flex items-center gap-1 bg-[#12131a] px-2 py-1 rounded border border-[#464554]/40"
                        >
                          {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          {copiedIndex === idx ? 'Copied' : 'Copy'}
                        </button>
                      </div>

                      {/* Display JSON or Form or Docs dynamically */}
                      <pre className="text-[10px] font-mono text-emerald-300 bg-[#12131a] p-2.5 rounded-lg overflow-x-auto max-h-48 custom-scrollbar whitespace-pre-wrap">
                        {typeof msg.artifact === 'object' ? JSON.stringify(msg.artifact, null, 2) : msg.artifact}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2.5 text-xs text-[#c0c1ff] bg-[#12131a] p-3.5 rounded-2xl border border-[#6366f1]/40 w-fit animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin text-[#6366f1]" />
                <span>Copilot is synthesizing enterprise payload & logic DAG...</span>
              </div>
            )}
          </div>

          {/* Prompt Input Form */}
          <form onSubmit={handleSendMessage} className="mt-4 pt-3 border-t border-[#464554]/40 flex items-center gap-2">
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder={`Ask Copilot for ${modulesList.find(m => m.id === activeModule)?.name}...`}
              className="flex-1 bg-[#12131a] border border-[#464554]/60 rounded-2xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#6366f1] shadow-inner"
            />
            <button
              type="submit"
              disabled={loading || !promptInput.trim()}
              className="bg-gradient-to-r from-[#6366f1] to-[#8083ff] hover:opacity-90 disabled:opacity-50 text-white p-3.5 rounded-2xl shadow-glow transition-all flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
