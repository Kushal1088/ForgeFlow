import React, { useState } from 'react';
import { 
  Building2, 
  Users2, 
  Database, 
  DollarSign, 
  Activity, 
  ShieldCheck, 
  Cpu, 
  Server, 
  CheckCircle2, 
  Eye,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AdminDetailModal } from './AdminDetailModal';

export const SuperAdminDashboardPage = () => {
  const { organizations } = useAuth();
  const [selectedTelemetry, setSelectedTelemetry] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  const handleOpenTelemetry = (title, data) => {
    setModalTitle(title);
    setSelectedTelemetry(data);
  };

  return (
    <div className="space-y-8 animate-fadeIn select-none">
      {/* Top Banner */}
      <div className="pb-6 border-b border-[#464554]/40 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-2">
            Platform Operations & Global SaaS Analytics
          </h1>
          <p className="text-sm text-[#908fa0] mt-1">Super Admin control plane for platform owner Kushal Pandey.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-[#6366f1]/20 text-[#c0c1ff] border border-[#6366f1]/40 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 fill-current text-[#6366f1]" /> Telemetry Active
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => handleOpenTelemetry("Organization Telemetry", { count: organizations.length, list: organizations })}
          className="bg-[#12131a] border border-[#464554]/40 hover:border-[#6366f1] rounded-2xl p-5 space-y-3 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#908fa0] uppercase">Total Organizations</span>
            <div className="w-8 h-8 rounded-xl bg-[#6366f1]/20 text-[#6366f1] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-heading font-bold text-white">{organizations.length} <span className="text-xs font-normal text-emerald-400">+100% active</span></p>
          <p className="text-[10px] font-mono text-[#6366f1] flex items-center gap-1">Click for deep telemetry <Eye className="w-3 h-3" /></p>
        </div>

        <div 
          onClick={() => handleOpenTelemetry("User Directory Metrics", { totalUsers: 19, activeSessions: 14, roles: { owners: 2, admins: 4, builders: 8, members: 5 } })}
          className="bg-[#12131a] border border-[#464554]/40 hover:border-purple-500 rounded-2xl p-5 space-y-3 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#908fa0] uppercase">Total Platform Users</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-heading font-bold text-white">19 <span className="text-xs font-normal text-[#908fa0]">Across all tenants</span></p>
          <p className="text-[10px] font-mono text-purple-400 flex items-center gap-1">Click for role breakdown <Eye className="w-3 h-3" /></p>
        </div>

        <div 
          onClick={() => handleOpenTelemetry("Financial Revenue Analytics", { mrr: "$24,800", arr: "$297,600", tiers: { enterprise: "$18,400", pro: "$6,400" } })}
          className="bg-[#12131a] border border-[#464554]/40 hover:border-emerald-500 rounded-2xl p-5 space-y-3 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#908fa0] uppercase">Platform Monthly MRR</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-heading font-bold text-white">$24,800 <span className="text-xs font-normal text-emerald-400">+18% growth</span></p>
          <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">Click for financial telemetry <Eye className="w-3 h-3" /></p>
        </div>

        <div 
          onClick={() => handleOpenTelemetry("MongoDB Database Cluster State", { status: "Connected", database: "forgeflow", pools: 4, heapUsed: "84.2 MB", uptimeSeconds: 432900 })}
          className="bg-[#12131a] border border-emerald-500/40 hover:border-emerald-400 rounded-2xl p-5 space-y-3 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#908fa0] uppercase">MongoDB Database Status</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <p className="text-lg font-heading font-bold text-emerald-400">Connected</p>
          <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">Click for cluster health <Eye className="w-3 h-3" /></p>
        </div>
      </div>

      {/* Detailed Technical Telemetry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#12131a] border border-[#464554]/40 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#464554]/30 pb-3">
            <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#6366f1]" /> Engine Worker Health & SLO Metrics
            </h3>
            <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">SLO 99.99%</span>
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-[#1e1f26] rounded-xl border border-[#464554]/30">
              <span className="text-[#908fa0]">Async Graph Dispatch Latency</span>
              <span className="font-mono text-emerald-400 font-semibold">42 ms (Avg)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#1e1f26] rounded-xl border border-[#464554]/30">
              <span className="text-[#908fa0]">Active Server Workers</span>
              <span className="font-mono text-white font-semibold">2 Cluster Nodes (Host 5000)</span>
            </div>
          </div>
        </div>

        <div className="bg-[#12131a] border border-[#464554]/40 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#464554]/30 pb-3">
            <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-purple-400" /> Subscription & MRR Breakdown
            </h3>
            <span className="text-[10px] font-mono bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">Enterprise Pro</span>
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-[#1e1f26] rounded-xl border border-[#464554]/30">
              <span className="text-[#908fa0]">Acme Global Corp (Enterprise)</span>
              <span className="font-mono text-white font-semibold">$18,400 / mo</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#1e1f26] rounded-xl border border-[#464554]/30">
              <span className="text-[#908fa0]">DevOps Platform Team (Pro)</span>
              <span className="font-mono text-white font-semibold">$6,400 / mo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Organizations Overview Table */}
      <div className="bg-[#12131a] border border-[#464554]/40 rounded-2xl overflow-hidden shadow-2xl space-y-4">
        <div className="p-5 bg-[#1e1f26] border-b border-[#464554]/40 flex items-center justify-between">
          <h3 className="text-sm font-heading font-bold text-white">Active SaaS Organizations</h3>
          <span className="text-xs font-mono text-[#6366f1]">{organizations.length} Tenants provisioned</span>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#464554]/40 text-[10px] font-mono uppercase text-[#908fa0]">
              <th className="py-3 px-6">Organization Name</th>
              <th className="py-3 px-6">Subscription Tier</th>
              <th className="py-3 px-6">Active Users</th>
              <th className="py-3 px-6">Workflows</th>
              <th className="py-3 px-6">Monthly Revenue</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#464554]/30 text-xs">
            {organizations.map((org) => (
              <tr 
                key={org.id} 
                onClick={() => handleOpenTelemetry(`Tenant Deep Telemetry: ${org.name}`, org)}
                className="hover:bg-[#1e1f26]/50 transition-colors cursor-pointer"
              >
                <td className="py-4 px-6 font-semibold text-white">{org.name}</td>
                <td className="py-4 px-6 font-mono text-[#c0c1ff]">{org.tier}</td>
                <td className="py-4 px-6 font-mono text-white">{org.users} seats</td>
                <td className="py-4 px-6 font-mono text-white">{org.workflows} graphs</td>
                <td className="py-4 px-6 font-mono text-emerald-400 font-semibold">{org.mrr || '$18,400'}</td>
                <td className="py-4 px-6">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded text-[10px] font-mono">
                    {org.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminDetailModal 
        isOpen={Boolean(selectedTelemetry)} 
        onClose={() => setSelectedTelemetry(null)} 
        title={modalTitle}
        data={selectedTelemetry}
      />
    </div>
  );
};
