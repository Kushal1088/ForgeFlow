import React, { useEffect, useState } from 'react';
import { PlaySquare, CheckCircle2, AlertCircle, Clock, ChevronRight, Check, X } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export const ExecutionsPage = () => {
  const [executions, setExecutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExec, setSelectedExec] = useState(null);

  const fetchExecutions = () => {
    fetch(`${API_BASE_URL}/api/v1/executions`)
      .then(res => res.json())
      .then(data => {
        setExecutions(data.executions || []);
        if (data.executions && data.executions.length > 0) {
          setSelectedExec(data.executions[0]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchExecutions();
  }, []);

  const handleApprove = (execId) => {
    const updated = executions.map(e => e.id === execId ? { ...e, status: 'completed' } : e);
    setExecutions(updated);
    if (selectedExec?.id === execId) {
      setSelectedExec({ ...selectedExec, status: 'completed' });
    }
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 animate-fadeIn select-none overflow-x-hidden">
      {/* Header */}
      <div className="pb-6 border-b border-[#464554]/40">
        <h1 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-2">
          Execution Runs & Step Logs
        </h1>
        <p className="text-xs sm:text-sm text-[#908fa0] mt-1">Audit granular step execution payloads, monitor live runs, and process human approvals.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Runs List */}
        <div className="lg:col-span-1 bg-[#1e1f26] border border-[#464554]/40 rounded-2xl p-4 space-y-3">
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#908fa0]">Execution History</p>
          {loading ? (
            <div className="p-6 text-center text-xs text-[#908fa0]">Fetching execution history...</div>
          ) : executions.length === 0 ? (
            <div className="p-6 text-center text-xs text-[#908fa0]">No executions recorded.</div>
          ) : (
            executions.map((exec) => {
              const isSelected = selectedExec?.id === exec.id;
              return (
                <div
                  key={exec.id}
                  onClick={() => setSelectedExec(exec)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-[#12131a] border-[#6366f1] shadow-glow' 
                      : 'bg-[#12131a]/60 border-[#464554]/40 hover:border-[#464554]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 gap-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-semibold border ${
                      exec.status === 'completed' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                        : exec.status === 'pending_approval' 
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                        : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                    }`}>
                      {exec.status}
                    </span>
                    <span className="text-[10px] font-mono text-[#908fa0] truncate">
                      {new Date(exec.started_at).toLocaleTimeString()}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate">{exec.workflow_name}</h4>
                  <p className="text-[10px] font-mono text-[#908fa0] mt-1 truncate">ID: {exec.id}</p>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Execution Inspector */}
        <div className="lg:col-span-2 bg-[#1e1f26] border border-[#464554]/40 rounded-2xl p-4 sm:p-6 space-y-6 overflow-hidden">
          {selectedExec ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#464554]/40 gap-3">
                <div>
                  <span className="text-[10px] font-mono text-[#6366f1] uppercase">Run Log Inspector</span>
                  <h2 className="text-base sm:text-lg font-heading font-bold text-white mt-0.5">{selectedExec.workflow_name}</h2>
                  <p className="text-xs font-mono text-[#908fa0]">Execution ID: {selectedExec.id}</p>
                </div>

                {selectedExec.status === 'pending_approval' && (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleApprove(selectedExec.id)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-glow w-full sm:w-auto justify-center"
                    >
                      <Check className="w-4 h-4" /> Approve Step
                    </button>
                  </div>
                )}
              </div>

              {/* Step Logs Stack */}
              <div className="space-y-4">
                <p className="text-[10px] font-mono uppercase text-[#908fa0]">Recorded Node Step Traces</p>
                {selectedExec.logs?.map((log, idx) => (
                  <div key={idx} className="bg-[#12131a] border border-[#464554]/50 rounded-xl p-3.5 sm:p-4 space-y-2 overflow-hidden">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span className="text-xs font-bold text-white truncate">{log.label || log.node_id}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#908fa0] flex-shrink-0">{log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : ''}</span>
                    </div>
                    {log.input && (
                      <pre className="bg-[#1e1f26] p-2.5 rounded-lg text-[10px] sm:text-[11px] font-mono text-[#c0c1ff] overflow-x-auto border border-[#464554]/30 max-w-full">
                        {JSON.stringify(log.input, null, 2)}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-xs text-[#908fa0]">Select an execution run to view step payloads.</div>
          )}
        </div>
      </div>
    </div>
  );
};
