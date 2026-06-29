import React, { useEffect, useState } from 'react';
import { 
  Workflow, 
  PlaySquare, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Plus, 
  ArrowUpRight, 
  Zap,
  Activity
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/analytics/dashboard')
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const metrics = data?.metrics || {
    totalWorkflows: 12,
    activeWorkflows: 8,
    totalExecutions: 1420,
    successRate: '99.2%',
    avgExecutionTime: '1.1s',
    pendingApprovals: 2
  };

  const throughput = data?.throughput || [
    { time: '00:00', runs: 12 },
    { time: '04:00', runs: 8 },
    { time: '08:00', runs: 45 },
    { time: '12:00', runs: 89 },
    { time: '16:00', runs: 67 },
    { time: '20:00', runs: 34 }
  ];

  return (
    <div className="p-8 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#464554]/40">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-2">
            Workflow Operating Dashboard
            <span className="text-xs bg-[#6366f1]/20 text-[#c0c1ff] border border-[#6366f1]/30 px-2 py-0.5 rounded-md font-mono">
              Live Engine
            </span>
          </h1>
          <p className="text-sm text-[#908fa0] mt-1">Real-time overview of business logic throughput and workflow runs across your organization.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/workflows')} 
            className="bg-[#6366f1] hover:bg-[#8083ff] text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-glow transition-all"
          >
            <Plus className="w-4 h-4" /> Create Workflow
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1e1f26] border border-[#464554]/40 rounded-2xl p-5 relative overflow-hidden group hover:border-[#6366f1]/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#908fa0] uppercase">Active Workflows</span>
            <div className="w-8 h-8 rounded-xl bg-[#6366f1]/20 text-[#6366f1] flex items-center justify-center">
              <Workflow className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-heading font-bold text-white mt-3">{metrics.activeWorkflows} <span className="text-xs text-[#908fa0] font-normal">/ {metrics.totalWorkflows} Total</span></p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-2">
            <TrendingUp className="w-3.5 h-3.5" /> +14% this month
          </div>
        </div>

        <div className="bg-[#1e1f26] border border-[#464554]/40 rounded-2xl p-5 relative overflow-hidden group hover:border-[#6366f1]/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#908fa0] uppercase">Total Executions</span>
            <div className="w-8 h-8 rounded-xl bg-[#6366f1]/20 text-[#6366f1] flex items-center justify-center">
              <PlaySquare className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-heading font-bold text-white mt-3">{metrics.totalExecutions}</p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-2">
            <Activity className="w-3.5 h-3.5" /> High throughput
          </div>
        </div>

        <div className="bg-[#1e1f26] border border-[#464554]/40 rounded-2xl p-5 relative overflow-hidden group hover:border-[#6366f1]/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#908fa0] uppercase">Success Rate</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-heading font-bold text-white mt-3">{metrics.successRate}</p>
          <div className="flex items-center gap-1 text-[11px] text-[#908fa0] mt-2">
            Standard SLA met
          </div>
        </div>

        <div className="bg-[#1e1f26] border border-[#464554]/40 rounded-2xl p-5 relative overflow-hidden group hover:border-[#6366f1]/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#908fa0] uppercase">Avg Execution Latency</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-heading font-bold text-white mt-3">{metrics.avgExecutionTime}</p>
          <div className="flex items-center gap-1 text-[11px] text-amber-400 mt-2">
            {metrics.pendingApprovals} pending approvals
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-[#1e1f26] border border-[#464554]/40 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-heading font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#6366f1]" /> Workflow Execution Throughput (Runs / Hour)
            </h2>
            <p className="text-xs text-[#908fa0]">Automated node execution volume monitored in real time.</p>
          </div>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={throughput}>
              <defs>
                <linearGradient id="colorRuns" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#908fa0" fontSize={12} tickLine={false} />
              <YAxis stroke="#908fa0" fontSize={12} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#12131a', borderColor: '#464554', borderRadius: '12px', color: '#fff' }}
              />
              <Area type="monotone" dataKey="runs" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRuns)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          onClick={() => navigate('/workflows')}
          className="bg-[#1e1f26] hover:bg-[#282a31] border border-[#464554]/40 p-6 rounded-2xl cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-white group-hover:text-[#6366f1] transition-colors">Visual Workflow Canvas Builder</h3>
            <ArrowUpRight className="w-4 h-4 text-[#908fa0] group-hover:text-[#6366f1] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
          <p className="text-xs text-[#908fa0]">Construct multi-step automation pipelines with conditional logic and approval chains.</p>
        </div>

        <div 
          onClick={() => navigate('/executions')}
          className="bg-[#1e1f26] hover:bg-[#282a31] border border-[#464554]/40 p-6 rounded-2xl cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-white group-hover:text-[#6366f1] transition-colors">Execution Logs & Approvals</h3>
            <ArrowUpRight className="w-4 h-4 text-[#908fa0] group-hover:text-[#6366f1] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
          <p className="text-xs text-[#908fa0]">Inspect granular node payload outputs, trace execution paths, or respond to pending sign-offs.</p>
        </div>
      </div>
    </div>
  );
};
