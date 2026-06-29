import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  Zap, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Play, 
  CheckCircle2, 
  Globe, 
  Sparkles, 
  Sun, 
  Moon,
  Workflow,
  Activity,
  Users,
  Lock,
  Terminal,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Heart,
  Smile,
  X,
  Info,
  Compass,
  Rocket,
  BookOpen,
  MousePointerClick,
  Sliders,
  Database,
  Send,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginOrgUser, theme, toggleTheme } = useAuth();
  
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('builder');
  const [howItWorksStep, setHowItWorksStep] = useState(0);
  const [guideTab, setGuideTab] = useState('overview');

  // Sweet Notifications State
  const [showWelcomeMsg, setShowWelcomeMsg] = useState(false);
  const [showLogoutMsg, setShowLogoutMsg] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('logout') === 'true') {
      setShowLogoutMsg(true);
      // Remove query param without refresh
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      // Show sweet welcome message on visit
      const timer = setTimeout(() => {
        setShowWelcomeMsg(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleTryDemo = () => {
    loginOrgUser('demo@forgeflow.io', 'demo123', 'viewer');
    navigate('/app');
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const stepsInfo = [
    {
      step: "01",
      title: "Connect Triggers & Event Ingestion",
      desc: "Link your enterprise systems seamlessly. ForgeFlow captures webhooks, Stripe billing events, database triggers, or scheduled cron cronjobs in real time under 50ms.",
      icon: Database,
      badge: "Inbound Latency <50ms",
      color: "from-blue-500/20 to-indigo-500/20 border-blue-500/40 text-blue-400"
    },
    {
      step: "02",
      title: "Design Visual Workflows visually",
      desc: "Drag and drop customizable logic nodes on our smooth infinite canvas. Connect triggers, dynamic conditional logic expression splitters, and automated actions.",
      icon: Sliders,
      badge: "Drag & Drop Canvas",
      color: "from-indigo-500/20 to-purple-500/20 border-indigo-500/40 text-indigo-400"
    },
    {
      step: "03",
      title: "Human & AI Governance",
      desc: "Pause execution automatically for critical financial sign-offs or managerial approvals. Send instant Slack and Email alerts to authorized role holders.",
      icon: ShieldCheck,
      badge: "Human-in-the-Loop",
      color: "from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-400"
    },
    {
      step: "04",
      title: "Realtime Telemetry & Scaling",
      desc: "Monitor execution runs with precise node-level step logs, throughput charts powered by Recharts, and automated MongoDB state persistence.",
      icon: Activity,
      badge: "99.99% Reliability",
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-400"
    }
  ];

  const faqs = [
    {
      q: "How does ForgeFlow handle complex business logic branching?",
      a: "ForgeFlow features a custom async node execution engine (built with Node.js and MongoDB) that dynamically evaluates conditional expression branches, loops, and API webhook payloads in under 50 milliseconds."
    },
    {
      q: "What is Human-in-the-Loop approval?",
      a: "Human-in-the-Loop approvals pause execution at designated nodes, sending real-time alerts via Slack or email to authorized role holders (Owner/Admin) to sign off before downstream execution continues."
    },
    {
      q: "Is ForgeFlow compatible with MongoDB and Supabase?",
      a: "Yes! ForgeFlow natively supports MongoDB Atlas connection pooling for graph state persistence, along with Supabase authentication and real-time database webhooks."
    },
    {
      q: "How does role-based access control (RBAC) work?",
      a: "ForgeFlow enforces strict multi-tenant RBAC across 5 distinct permission levels: Owner, Admin, Builder, Member, and Viewer, complete with isolated Super Admin platform routing."
    }
  ];

  return (
    <div className="min-h-screen bg-[#12131a] text-[#e2e1eb] font-sans select-none overflow-x-hidden flex flex-col justify-between transition-colors duration-300 relative">
      
      {/* SWEET WELCOME NOTIFICATION TOAST */}
      {showWelcomeMsg && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 max-w-sm w-full bg-[#1e1f26]/95 backdrop-blur-xl border border-[#6366f1]/50 p-4 rounded-2xl shadow-2xl animate-bounce-short text-left transition-all duration-300">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8083ff] flex items-center justify-center text-white shadow-glow flex-shrink-0">
              <Heart className="w-5 h-5 fill-current text-pink-300" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white flex items-center gap-1">
                  Welcome to ForgeFlow! <Sparkles className="w-3.5 h-3.5 text-amber-300 inline" />
                </h4>
                <button 
                  onClick={() => setShowWelcomeMsg(false)}
                  className="text-[#908fa0] hover:text-white p-1 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[11px] text-[#c0c1ff] mt-1 leading-relaxed">
                We're thrilled to have you here! Explore our enterprise visual workflow engine and transform your business operations today. ✨
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SWEET LOGOUT NOTIFICATION TOAST */}
      {showLogoutMsg && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 max-w-sm w-full bg-[#1e1f26]/95 backdrop-blur-xl border border-emerald-500/50 p-4 rounded-2xl shadow-2xl animate-fadeIn text-left transition-all duration-300">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Smile className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white flex items-center gap-1">
                  Logged Out Safely! 👋
                </h4>
                <button 
                  onClick={() => setShowLogoutMsg(false)}
                  className="text-[#908fa0] hover:text-white p-1 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[11px] text-emerald-300 mt-1 leading-relaxed">
                Thank you for using ForgeFlow! Your session has ended securely. Have a wonderful day and come back soon! 🚀
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <header className="h-20 border-b border-[#464554]/40 px-4 sm:px-12 flex items-center justify-between sticky top-0 bg-[#12131a]/90 backdrop-blur-md z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8083ff] flex items-center justify-center shadow-glow">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-current" />
          </div>
          <span className="font-heading font-bold text-base sm:text-lg text-white tracking-tight">ForgeFlow</span>
        </div>

        {/* Primary Action Buttons & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleTheme}
            title="Toggle Light / Dark Theme"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#1e1f26] border border-[#464554]/50 flex items-center justify-center text-[#908fa0] hover:text-white hover:border-[#6366f1] transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#6366f1]" />}
          </button>

          <button
            onClick={handleTryDemo}
            className="hidden md:flex text-xs font-semibold text-[#c0c1ff] hover:text-white bg-[#6366f1]/10 hover:bg-[#6366f1]/20 border border-[#6366f1]/30 px-3.5 py-2 rounded-xl transition-all items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#6366f1]" /> Try Demo
          </button>

          <Link
            to="/login"
            className="text-xs font-semibold text-[#e2e1eb] hover:text-white px-3 py-2 rounded-xl hover:bg-[#1e1f26] transition-all"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-[#6366f1] hover:bg-[#8083ff] text-white text-xs font-semibold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-glow transition-all flex items-center gap-1.5"
          >
            Sign Up <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 sm:py-20 max-w-5xl mx-auto space-y-8 sm:space-y-10 animate-fadeIn w-full overflow-hidden">
        <div className="inline-flex items-center gap-2 bg-[#6366f1]/10 border border-[#6366f1]/30 text-[#c0c1ff] px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono max-w-full truncate">
          <Zap className="w-3.5 h-3.5 fill-current text-[#6366f1] flex-shrink-0" /> Enterprise Workflow Automation Engine v2.4
        </div>

        <h1 className="text-3xl sm:text-6xl font-heading font-bold text-white tracking-tight leading-tight max-w-4xl px-2">
          Automate Complex Business Workflows with Visual Precision.
        </h1>

        <p className="text-sm sm:text-lg text-[#908fa0] max-w-2xl leading-relaxed px-2">
          ForgeFlow empowers engineering and operations teams to build event-driven automation graphs, evaluate dynamic branching logic, and process human approvals effortlessly.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-2 w-full max-w-md sm:max-w-none justify-center px-4">
          <button
            onClick={() => navigate('/signup')}
            className="w-full sm:w-auto bg-gradient-to-r from-[#6366f1] to-[#8083ff] hover:opacity-90 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-glow transition-all"
          >
            Start Building Free Workspace <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleTryDemo}
            className="w-full sm:w-auto bg-[#1e1f26] hover:bg-[#282a31] border border-[#464554]/60 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#6366f1]" /> Explore Sample Demo Tenant
          </button>
        </div>

        {/* Interactive Platform Preview Mockup */}
        <div className="w-full pt-4 sm:pt-8">
          <div className="bg-[#1e1f26] border border-[#464554]/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden text-left max-w-full">
            {/* Window Controls Header */}
            <div className="flex items-center justify-between border-b border-[#464554]/40 pb-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80" />
                <span className="text-[10px] sm:text-xs font-mono text-[#908fa0] ml-1 truncate">forgeflow.app/workflows/builder</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <button 
                  onClick={() => setActiveTab('builder')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono transition-all ${activeTab === 'builder' ? 'bg-[#6366f1] text-white font-semibold' : 'text-[#908fa0] hover:text-white'}`}
                >
                  Canvas
                </button>
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono transition-all ${activeTab === 'analytics' ? 'bg-[#6366f1] text-white font-semibold' : 'text-[#908fa0] hover:text-white'}`}
                >
                  Telemetry
                </button>
              </div>
            </div>

            {/* Simulated Canvas View */}
            {activeTab === 'builder' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 py-2 sm:py-4">
                <div className="bg-[#12131a] p-3.5 rounded-xl border border-emerald-500/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded uppercase">Trigger</span>
                    <Zap className="w-3.5 h-3.5 text-emerald-400 fill-current" />
                  </div>
                  <h4 className="text-xs font-bold text-white">Inbound Webhook</h4>
                  <p className="text-[10px] text-[#908fa0]">Listens for order payload from Stripe API</p>
                </div>

                <div className="bg-[#12131a] p-3.5 rounded-xl border border-[#6366f1] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono bg-[#6366f1]/20 text-[#c0c1ff] px-2 py-0.5 rounded uppercase">Condition</span>
                    <Cpu className="w-3.5 h-3.5 text-[#6366f1]" />
                  </div>
                  <h4 className="text-xs font-bold text-white">Evaluate PO Amount</h4>
                  <p className="text-[10px] text-[#908fa0]">If amount &gt; $10,000 → Trigger Approval</p>
                </div>

                <div className="bg-[#12131a] p-3.5 rounded-xl border border-amber-500/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded uppercase">Human Action</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <h4 className="text-xs font-bold text-white">VP Finance Sign-off</h4>
                  <p className="text-[10px] text-[#908fa0]">Pauses execution until sign-off</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-4 min-h-[160px]">
                <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                  <div className="bg-[#12131a] p-2.5 rounded-xl border border-[#464554]/30">
                    <span className="text-[9px] font-mono text-[#908fa0] block">Avg Latency</span>
                    <span className="text-emerald-400 font-bold font-mono text-xs sm:text-sm">42 ms</span>
                  </div>
                  <div className="bg-[#12131a] p-2.5 rounded-xl border border-[#464554]/30">
                    <span className="text-[9px] font-mono text-[#908fa0] block">Success Rate</span>
                    <span className="text-white font-bold font-mono text-xs sm:text-sm">99.98%</span>
                  </div>
                  <div className="bg-[#12131a] p-2.5 rounded-xl border border-[#464554]/30">
                    <span className="text-[9px] font-mono text-[#908fa0] block">MongoDB State</span>
                    <span className="text-emerald-400 font-bold font-mono text-xs sm:text-sm truncate block">Connected</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* NEW DEDICATED SECTION: WHAT IS FORGEFLOW & HOW IT WORKS */}
        <div className="w-full pt-12 sm:pt-20 space-y-12 text-left">
          
          {/* SECTION HEADER */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 bg-[#6366f1]/15 text-[#c0c1ff] border border-[#6366f1]/30 px-3 py-1 rounded-full text-xs font-mono">
              <Compass className="w-3.5 h-3.5 text-[#6366f1]" /> Platform Guide for New Users
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              What is ForgeFlow & How Does It Work?
            </h2>
            <p className="text-xs sm:text-base text-[#908fa0] leading-relaxed">
              ForgeFlow is a modern, enterprise-grade workflow orchestration platform designed to replace manual processes with resilient, visual automation pipelines.
            </p>
          </div>

          {/* TABBED INTERACTIVE EXPLORER */}
          <div className="bg-[#1e1f26] border border-[#464554]/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
            <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#464554]/40 pb-4">
              <button 
                onClick={() => setGuideTab('overview')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${guideTab === 'overview' ? 'bg-[#6366f1] text-white shadow-glow' : 'text-[#908fa0] hover:text-white hover:bg-[#282a31]'}`}
              >
                <BookOpen className="w-4 h-4" /> 1. What is ForgeFlow?
              </button>
              <button 
                onClick={() => setGuideTab('how-it-works')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${guideTab === 'how-it-works' ? 'bg-[#6366f1] text-white shadow-glow' : 'text-[#908fa0] hover:text-white hover:bg-[#282a31]'}`}
              >
                <Workflow className="w-4 h-4" /> 2. How It Works (4 Steps)
              </button>
              <button 
                onClick={() => setGuideTab('quickstart')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${guideTab === 'quickstart' ? 'bg-[#6366f1] text-white shadow-glow' : 'text-[#908fa0] hover:text-white hover:bg-[#282a31]'}`}
              >
                <Rocket className="w-4 h-4" /> 3. Quick Start for New Users
              </button>
            </div>

            {/* TAB CONTENT 1: WHAT IS FORGEFLOW */}
            {guideTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center animate-fadeIn">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#6366f1]" /> Next-Gen Enterprise Automation
                  </h3>
                  <p className="text-xs sm:text-sm text-[#908fa0] leading-relaxed">
                    Think of ForgeFlow as the central operating system for your business software integrations. Instead of writing endless lines of glued code, teams design event flows visually on an interactive node canvas.
                  </p>
                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-[#e2e1eb]"><strong className="text-white">Zero Maintenance Infrastructure:</strong> Built with high-performance Node.js workers and MongoDB persistence.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-[#e2e1eb]"><strong className="text-white">Human Sign-off Gates:</strong> Pause runs to get approval from owners before executing billing or sensitive ops.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-[#e2e1eb]"><strong className="text-white">Multi-Tenant RBAC:</strong> Secure workspace separation for enterprises with distinct team roles.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#12131a] p-6 rounded-2xl border border-[#464554]/40 space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#908fa0]">Platform Architecture Breakdown</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-[#1e1f26] rounded-xl border border-[#464554]/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400"><Layers className="w-4 h-4" /></div>
                        <div><p className="text-xs font-bold text-white">Visual Canvas Engine</p><p className="text-[10px] text-[#908fa0]">Infinite zoom, mini-map, auto-layout</p></div>
                      </div>
                      <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">Frontend</span>
                    </div>
                    <div className="p-3 bg-[#1e1f26] rounded-xl border border-[#464554]/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400"><Cpu className="w-4 h-4" /></div>
                        <div><p className="text-xs font-bold text-white">Async Execution Core</p><p className="text-[10px] text-[#908fa0]">Sub-50ms DAG DAG graph evaluation</p></div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Backend Engine</span>
                    </div>
                    <div className="p-3 bg-[#1e1f26] rounded-xl border border-[#464554]/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400"><Database className="w-4 h-4" /></div>
                        <div><p className="text-xs font-bold text-white">State & Audit Store</p><p className="text-[10px] text-[#908fa0]">MongoDB Atlas persistent execution state</p></div>
                      </div>
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Database</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: HOW IT WORKS IN 4 STEPS */}
            {guideTab === 'how-it-works' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stepsInfo.map((item, idx) => {
                    const Icon = item.icon;
                    const isSelected = howItWorksStep === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setHowItWorksStep(idx)}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${isSelected ? `bg-gradient-to-br ${item.color} shadow-lg scale-[1.02]` : 'bg-[#12131a] border-[#464554]/40 hover:border-[#6366f1]/50'}`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-[#908fa0]">{item.step}</span>
                            <span className="text-[9px] font-mono bg-[#1e1f26] text-[#c0c1ff] px-2 py-0.5 rounded border border-[#464554]/40">{item.badge}</span>
                          </div>
                          <div className="w-10 h-10 rounded-xl bg-[#1e1f26] border border-[#464554]/40 flex items-center justify-center text-white">
                            <Icon className="w-5 h-5" />
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-white">{item.title}</h4>
                        </div>
                        <p className="text-[11px] text-[#908fa0] mt-3 leading-relaxed">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: QUICK START FOR NEW USERS */}
            {guideTab === 'quickstart' && (
              <div className="space-y-6 animate-fadeIn text-left">
                <div className="bg-[#12131a] p-6 rounded-2xl border border-[#464554]/40 space-y-6">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-emerald-400" /> Getting Started in 3 Easy Steps
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2 border-l-2 border-[#6366f1] pl-4">
                      <span className="text-xs font-mono text-[#6366f1] font-bold">STEP 1</span>
                      <h4 className="text-sm font-bold text-white">Sign Up or Launch Demo</h4>
                      <p className="text-xs text-[#908fa0]">Click 'Try Demo' to explore instantly with pre-populated demo data, or create your free organizational workspace.</p>
                    </div>

                    <div className="space-y-2 border-l-2 border-indigo-400 pl-4">
                      <span className="text-xs font-mono text-indigo-400 font-bold">STEP 2</span>
                      <h4 className="text-sm font-bold text-white">Create Visual Workflows</h4>
                      <p className="text-xs text-[#908fa0]">Navigate to Workflows and use the intuitive drag-and-drop builder to configure trigger nodes and action logic.</p>
                    </div>

                    <div className="space-y-2 border-l-2 border-emerald-400 pl-4">
                      <span className="text-xs font-mono text-emerald-400 font-bold">STEP 3</span>
                      <h4 className="text-sm font-bold text-white">Simulate & Monitor Execution</h4>
                      <p className="text-xs text-[#908fa0]">Run simulated payloads to verify step-by-step performance logs, execution runs, and live telemetry graphs.</p>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-center">
                    <button
                      onClick={handleTryDemo}
                      className="bg-gradient-to-r from-[#6366f1] to-[#8083ff] text-white font-semibold text-xs px-6 py-3 rounded-xl shadow-glow hover:opacity-90 transition-all flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" /> Launch Sample Demo Workspace Now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enterprise Feature Pillars */}
        <div className="w-full pt-10 sm:pt-16 space-y-6 sm:space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-3xl font-heading font-bold text-white tracking-tight">
              Engineered for Enterprise Operations & Scaling
            </h2>
            <p className="text-xs sm:text-sm text-[#908fa0] max-w-xl mx-auto">
              Built from the ground up to support modern cloud architecture and multi-tenant isolation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left">
            <div className="bg-[#1e1f26] border border-[#464554]/40 p-5 sm:p-6 rounded-2xl space-y-2.5 hover:border-[#6366f1]/60 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#6366f1]/20 text-[#6366f1] flex items-center justify-center">
                <Workflow className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">Visual Graph Builder</h3>
              <p className="text-xs text-[#908fa0] leading-relaxed">
                Intuitive drag-and-drop workflow canvas with node duplication, live autosave, minimap overview, and JSON graph serialization.
              </p>
            </div>

            <div className="bg-[#1e1f26] border border-[#464554]/40 p-5 sm:p-6 rounded-2xl space-y-2.5 hover:border-[#6366f1]/60 transition-all">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">Realtime Telemetry</h3>
              <p className="text-xs text-[#908fa0] leading-relaxed">
                Track volume throughput graphs powered by Recharts, step execution logs, and live system worker latencies in real time.
              </p>
            </div>

            <div className="bg-[#1e1f26] border border-[#464554]/40 p-5 sm:p-6 rounded-2xl space-y-2.5 hover:border-[#6366f1]/60 transition-all">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">Isolated Security RBAC</h3>
              <p className="text-xs text-[#908fa0] leading-relaxed">
                5 distinct tenant permissions levels (Owner, Admin, Builder, Member, Viewer) with isolated Super Admin platform control.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="w-full pt-10 sm:pt-16 space-y-4 sm:space-y-6 text-left max-w-3xl mx-auto">
          <div className="text-center space-y-1.5 mb-6">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">Frequently Asked Questions</h2>
            <p className="text-xs text-[#908fa0]">Everything you need to know about the ForgeFlow SaaS platform.</p>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                onClick={() => toggleFaq(idx)}
                className="bg-[#1e1f26] border border-[#464554]/40 rounded-2xl p-4 sm:p-5 cursor-pointer hover:border-[#6366f1]/60 transition-all"
              >
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-xs sm:text-sm font-bold text-white">{faq.q}</h4>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-[#6366f1] flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#908fa0] flex-shrink-0" />}
                </div>
                {openFaq === idx && (
                  <p className="text-xs text-[#908fa0] mt-3 pt-3 border-t border-[#464554]/30 leading-relaxed animate-fadeIn">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Call-to-Action Banner */}
        <div className="w-full pt-10 sm:pt-16">
          <div className="bg-gradient-to-r from-[#6366f1]/20 to-[#8083ff]/20 border border-[#6366f1]/40 p-6 sm:p-12 rounded-3xl text-center space-y-5 sm:space-y-6 relative overflow-hidden shadow-glow">
            <h2 className="text-xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Ready to Automate Your Business Operating Workflows?
            </h2>
            <p className="text-xs sm:text-sm text-[#908fa0] max-w-lg mx-auto">
              Join leading organizations automating complex workflows with ForgeFlow today.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button
                onClick={() => navigate('/signup')}
                className="bg-[#6366f1] hover:bg-[#8083ff] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl text-xs font-semibold shadow-glow transition-all"
              >
                Create Free Workspace Now
              </button>
              <button
                onClick={handleTryDemo}
                className="bg-[#12131a] hover:bg-[#1e1f26] text-white border border-[#464554] px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl text-xs font-semibold transition-all"
              >
                Try Live Demo
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#464554]/30 px-4 sm:px-8 py-6 text-center text-xs text-[#908fa0] font-mono space-y-3">
        <div>
          Designed & Developed by <a href="https://kushalportfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-white font-bold hover:text-[#6366f1] underline transition-colors">Kushal Pandey</a> • © 2026 ForgeFlow SaaS Platform
        </div>
        <div className="flex items-center justify-center gap-4 text-[11px]">
          <a href="https://github.com/Kushal1088" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
            GitHub
          </a>
          <span className="text-[#464554]">•</span>
          <a href="https://www.linkedin.com/in/pandeykushal1/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
            LinkedIn
          </a>
          <span className="text-[#464554]">•</span>
          <a href="https://kushalportfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
            Portfolio
          </a>
        </div>
      </footer>
    </div>
  );
};
