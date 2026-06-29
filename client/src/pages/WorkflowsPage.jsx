import React, { useEffect, useState } from 'react';
import { Workflow, Plus, Play, MoreVertical, Layers, CheckCircle2, AlertCircle, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

export const WorkflowsPage = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [executingId, setExecutingId] = useState(null);
  const navigate = useNavigate();

  const fetchWorkflows = () => {
    fetch(`${API_BASE_URL}/api/v1/workflows`)
      .then(res => res.json())
      .then(d => { setWorkflows(d.workflows || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const handleExecute = async (e, wfId) => {
    e.stopPropagation();
    setExecutingId(wfId);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/workflows/${wfId}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: { amount: 12500, requester: 'Finance Dept' } })
      });
      const result = await res.json();
      setTimeout(() => {
        setExecutingId(null);
        navigate('/app/executions');
      }, 600);
    } catch (err) {
      setExecutingId(null);
    }
  };

  const handleCreateNew = async () => {
    const res = await fetch(`${API_BASE_URL}/api/v1/workflows`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'New Custom Automation',
        description: 'Visual workflow built with ForgeFlow canvas engine',
        trigger_type: 'webhook'
      })
    });
    const newWf = await res.json();
    navigate(`/app/workflows/builder/${newWf.id}`);
  };

  const filtered = workflows.filter(w => w.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-4 sm:p-8 space-y-6 animate-fadeIn select-none overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#464554]/40">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-2">
            Workflow Templates & Pipelines
          </h1>
          <p className="text-xs sm:text-sm text-[#908fa0] mt-1">Manage visual automation graphs, set triggers, and deploy business operating logic.</p>
        </div>
        <button 
          onClick={handleCreateNew} 
          className="bg-[#6366f1] hover:bg-[#8083ff] text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-glow transition-all w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" /> Create Workflow
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-3 bg-[#1e1f26] border border-[#464554]/40 rounded-xl p-3">
        <Search className="w-4 h-4 text-[#908fa0] flex-shrink-0" />
        <input 
          type="text" 
          placeholder="Search workflows by name or trigger..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent text-xs text-white placeholder-[#908fa0] focus:outline-none w-full"
        />
      </div>

      {/* Workflow Grid */}
      {loading ? (
        <div className="p-12 text-center text-xs text-[#908fa0]">Loading platform workflows...</div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center text-xs text-[#908fa0]">No workflows matching search criteria.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((wf) => (
            <div 
              key={wf.id}
              onClick={() => navigate(`/app/workflows/builder/${wf.id}`)}
              className="bg-[#1e1f26] hover:bg-[#282a31]/80 border border-[#464554]/40 hover:border-[#6366f1]/60 rounded-2xl p-5 sm:p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 group shadow-lg relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold border ${
                      wf.status === 'active' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      {wf.status}
                    </span>
                    <span className="text-[10px] font-mono text-[#908fa0] bg-[#12131a] px-2 py-0.5 rounded border border-[#464554]/40">
                      v{wf.version}.0
                    </span>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-heading font-bold text-white group-hover:text-[#6366f1] transition-colors mb-1.5">
                  {wf.name}
                </h3>
                <p className="text-xs text-[#908fa0] line-clamp-2 mb-4 leading-relaxed">
                  {wf.description || 'Automated workflow pipeline.'}
                </p>
              </div>

              <div className="pt-4 border-t border-[#464554]/30 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-[#908fa0] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#6366f1]" /> {wf.nodes?.length || 0} Nodes
                </span>
                <button
                  onClick={(e) => handleExecute(e, wf.id)}
                  disabled={executingId === wf.id}
                  className="bg-[#12131a] hover:bg-[#6366f1] text-[#e2e1eb] hover:text-white border border-[#464554]/60 hover:border-[#6366f1] px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all"
                >
                  <Play className={`w-3.5 h-3.5 ${executingId === wf.id ? 'animate-spin' : ''}`} /> 
                  {executingId === wf.id ? 'Running...' : 'Run Test'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
