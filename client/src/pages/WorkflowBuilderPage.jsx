import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import { 
  ArrowLeft, 
  Save, 
  Play, 
  Plus, 
  Zap, 
  GitBranch, 
  CheckSquare, 
  Mail, 
  Sliders,
  Trash2,
  Copy,
  ZoomIn,
  ZoomOut,
  Maximize2,
  CheckCircle2,
  Clock,
  Sparkles,
  Bot,
  Brain,
  Lock
} from 'lucide-react';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { AICopilotModal } from '../components/common/AICopilotModal';

export const WorkflowBuilderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workflow, setWorkflow] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState('Just now');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [nodeToDelete, setNodeToDelete] = useState(null);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v1/workflows/${id}`)
      .then(res => res.json())
      .then(data => {
        setWorkflow(data);
        setNodes(data.nodes || []);
      })
      .catch(() => {
        const demoNodes = [
          { id: 'node_1', type: 'trigger', data: { label: 'Inbound Webhook Payload' }, position: { x: 150, y: 200 } },
          { id: 'node_ai', type: 'ai_agent', data: { label: 'AI Data & Sentiment Extraction', model: 'Gemini 1.5 Pro' }, position: { x: 450, y: 120 } },
          { id: 'node_2', type: 'condition', data: { label: 'Evaluate Sentiment Score' }, position: { x: 750, y: 200 } },
          { id: 'node_3', type: 'approval', data: { label: 'VP Operations Sign-off' }, position: { x: 1050, y: 200 } }
        ];
        setNodes(demoNodes);
        setWorkflow({ id, name: 'AI-Powered Enterprise Workflow', status: 'active' });
      });
  }, [id]);

  // Keyboard shortcuts listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        triggerSave();
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedNode) {
        setNodeToDelete(selectedNode.id);
        setDeleteModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNode, nodes]);

  const triggerSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date().toLocaleTimeString());
    }, 400);
  };

  const addNode = (type, label) => {
    const newNode = {
      id: `node_${Date.now()}`,
      type,
      data: { label, model: type === 'ai_agent' ? 'Gemini 1.5 Pro' : undefined },
      position: { x: 250 + nodes.length * 30, y: 180 + (nodes.length % 3) * 40 }
    };
    setNodes([...nodes, newNode]);
    setSelectedNode(newNode);
    triggerSave();
  };

  const handleAIGenerate = (promptText) => {
    const generated = [
      { id: `node_${Date.now()}_1`, type: 'trigger', data: { label: 'Inbound Webhook Trigger' }, position: { x: 150, y: 200 } },
      { id: `node_${Date.now()}_2`, type: 'ai_agent', data: { label: `AI Agent: ${promptText.slice(0, 25)}...`, model: 'Gemini 1.5 Pro' }, position: { x: 450, y: 200 } },
      { id: `node_${Date.now()}_3`, type: 'condition', data: { label: 'Evaluate AI Confidence > 90%' }, position: { x: 750, y: 200 } },
      { id: `node_${Date.now()}_4`, type: 'action', data: { label: 'Dispatch Slack Alert' }, position: { x: 1050, y: 200 } }
    ];
    setNodes(generated);
    setSelectedNode(generated[1]);
    triggerSave();
  };

  const duplicateNode = (node) => {
    const dup = {
      id: `node_${Date.now()}`,
      type: node.type,
      data: { ...node.data, label: `${node.data.label} (Copy)` },
      position: { x: node.position.x + 40, y: node.position.y + 40 }
    };
    setNodes([...nodes, dup]);
    setSelectedNode(dup);
    triggerSave();
  };

  const confirmDeleteNode = () => {
    if (!nodeToDelete) return;
    setNodes(nodes.filter(n => n.id !== nodeToDelete));
    if (selectedNode?.id === nodeToDelete) setSelectedNode(null);
    setDeleteModalOpen(false);
    setNodeToDelete(null);
    triggerSave();
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#12131a] select-none overflow-hidden">
      {/* Builder Top Bar */}
      <div className="h-14 bg-[#1e1f26] border-b border-[#464554]/40 px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/app/workflows')} className="text-[#908fa0] hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-sm font-heading font-bold text-white flex items-center gap-2">
              {workflow?.name || 'Workflow Builder Canvas'}
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/40">
                AI Enabled v{workflow?.version || 1}.0
              </span>
            </h2>
            <p className="text-[10px] font-mono text-[#908fa0] flex items-center gap-2">
              <span>Graph ID: {id}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3 h-3" /> {isSaving ? 'Saving changes...' : `Autosaved at ${lastSaved}`}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setAiModalOpen(true)}
            className="bg-[#6366f1]/15 hover:bg-[#6366f1]/25 text-[#c0c1ff] border border-[#6366f1]/40 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-glow"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#6366f1]" /> AI Copilot (v3.0)
          </button>
          <button 
            onClick={triggerSave}
            className="bg-[#12131a] hover:bg-[#282a31] text-white border border-[#464554]/60 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all shadow-inner"
          >
            <Save className="w-3.5 h-3.5 text-[#6366f1]" /> Save Draft (Ctrl+S)
          </button>
          <button 
            onClick={() => navigate('/app/executions')}
            className="bg-[#6366f1] hover:bg-[#8083ff] text-white px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-glow transition-all"
          >
            <Play className="w-3.5 h-3.5" /> Test Execution
          </button>
        </div>
      </div>

      {/* Editor Main Section */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Toolbar / Node Palette */}
        <div className="w-64 bg-[#1e1f26] border-r border-[#464554]/40 p-4 space-y-4 overflow-y-auto">
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#908fa0]">Add Graph Nodes</p>
          <div className="space-y-2">
            {/* AI Agent Node */}
            <button 
              onClick={() => addNode('ai_agent', 'AI Prompt Engine / Data Extractor')}
              className="w-full bg-[#12131a] hover:bg-[#282a31] border border-[#6366f1]/60 p-3 rounded-xl flex items-center gap-3 text-left transition-all group shadow-glow"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8083ff] text-white flex items-center justify-center">
                <Bot className="w-4 h-4 fill-current" />
              </div>
              <div>
                <p className="text-xs font-bold text-white group-hover:text-[#6366f1]">AI Agent Node</p>
                <p className="text-[10px] text-[#908fa0]">LLM Prompt & Extraction</p>
              </div>
            </button>

            <button 
              onClick={() => addNode('trigger', 'New Webhook Listener')}
              className="w-full bg-[#12131a] hover:bg-[#282a31] border border-emerald-500/40 p-3 rounded-xl flex items-center gap-3 text-left transition-all group shadow-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white group-hover:text-emerald-400">Trigger Node</p>
                <p className="text-[10px] text-[#908fa0]">Inbound trigger event</p>
              </div>
            </button>

            <button 
              onClick={() => addNode('condition', 'If-Else Conditional')}
              className="w-full bg-[#12131a] hover:bg-[#282a31] border border-amber-500/40 p-3 rounded-xl flex items-center gap-3 text-left transition-all group shadow-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <GitBranch className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white group-hover:text-amber-400">Condition Node</p>
                <p className="text-[10px] text-[#908fa0]">Boolean rule evaluation</p>
              </div>
            </button>

            <button 
              onClick={() => addNode('approval', 'Human Sign-Off Request')}
              className="w-full bg-[#12131a] hover:bg-[#282a31] border border-purple-500/40 p-3 rounded-xl flex items-center gap-3 text-left transition-all group shadow-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <CheckSquare className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white group-hover:text-purple-400">Approval Node</p>
                <p className="text-[10px] text-[#908fa0]">RBAC human approval step</p>
              </div>
            </button>

            <button 
              onClick={() => addNode('action', 'Email / Webhook Dispatch')}
              className="w-full bg-[#12131a] hover:bg-[#282a31] border border-indigo-500/40 p-3 rounded-xl flex items-center gap-3 text-left transition-all group shadow-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white group-hover:text-indigo-400">Action Node</p>
                <p className="text-[10px] text-[#908fa0]">Executes automated task</p>
              </div>
            </button>
          </div>
        </div>

        {/* Center Grid Canvas with Zoom and Controls */}
        <div className="flex-1 bg-[#12131a] relative overflow-auto p-12 bg-dot-grid">
          {/* Canvas Floating Controls */}
          <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2 bg-[#1e1f26] border border-[#464554] p-1.5 rounded-xl shadow-2xl">
            <button 
              onClick={() => setZoom(Math.max(0.6, zoom - 0.1))} 
              title="Zoom Out"
              className="p-2 rounded-lg hover:bg-[#282a31] text-[#908fa0] hover:text-white transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-[#c0c1ff] px-2">{Math.round(zoom * 100)}%</span>
            <button 
              onClick={() => setZoom(Math.min(1.4, zoom + 0.1))} 
              title="Zoom In"
              className="p-2 rounded-lg hover:bg-[#282a31] text-[#908fa0] hover:text-white transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-[#464554]" />
            <button 
              onClick={() => setZoom(1)} 
              title="Reset Zoom"
              className="p-2 rounded-lg hover:bg-[#282a31] text-[#908fa0] hover:text-white transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Minimap Box Representation */}
          <div className="absolute bottom-6 left-6 z-30 w-36 h-24 bg-[#1e1f26]/90 border border-[#464554] rounded-xl p-2 shadow-2xl overflow-hidden pointer-events-none hidden md:block">
            <p className="text-[9px] font-mono text-[#908fa0] uppercase mb-1">Canvas Overview</p>
            <div className="relative w-full h-14 bg-[#12131a] rounded border border-[#464554]/40">
              {nodes.map(n => (
                <div 
                  key={n.id} 
                  style={{ left: `${(n.position.x / 1200) * 100}%`, top: `${(n.position.y / 600) * 100}%` }} 
                  className={`absolute w-2 h-1.5 rounded-sm ${n.type === 'ai_agent' ? 'bg-indigo-400' : 'bg-[#6366f1]'}`}
                />
              ))}
            </div>
          </div>

          {/* Scalable Node Canvas Container */}
          <div 
            style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
            className="relative min-w-[1300px] min-h-[700px] transition-transform duration-150"
          >
            {/* Render Nodes */}
            {nodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              let badgeColor = 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40';
              if (node.type === 'ai_agent') badgeColor = 'bg-gradient-to-r from-[#6366f1]/30 to-[#8083ff]/30 text-white border-[#6366f1]';
              if (node.type === 'trigger') badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
              if (node.type === 'condition') badgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/40';
              if (node.type === 'approval') badgeColor = 'bg-purple-500/20 text-purple-400 border-purple-500/40';

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{ left: `${node.position.x}px`, top: `${node.position.y}px` }}
                  className={`absolute w-64 bg-[#1e1f26] border rounded-2xl p-4 shadow-2xl cursor-pointer transition-all z-10 ${
                    isSelected ? 'border-[#6366f1] ring-2 ring-[#6366f1]/40 scale-105' : 'border-[#464554]/60 hover:border-[#6366f1]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-semibold border ${badgeColor} flex items-center gap-1`}>
                      {node.type === 'ai_agent' && <Bot className="w-3 h-3 text-[#6366f1]" />}
                      {node.type}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={(e) => { e.stopPropagation(); duplicateNode(node); }}
                        title="Duplicate Node"
                        className="text-[#908fa0] hover:text-[#6366f1] transition-colors p-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setNodeToDelete(node.id); setDeleteModalOpen(true); }}
                        title="Delete Node"
                        className="text-[#908fa0] hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1 flex items-center gap-1">
                    {node.data?.label || 'Custom Node'}
                  </h4>
                  <p className="text-[10px] font-mono text-[#908fa0]">ID: {node.id}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Inspector Panel */}
        {selectedNode && (
          <div className="w-80 bg-[#1e1f26] border-l border-[#464554]/40 p-5 space-y-6 overflow-y-auto animate-slideLeft z-20">
            <div className="flex items-center justify-between border-b border-[#464554]/40 pb-3">
              <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#6366f1]" /> Node Inspector
              </h3>
              <button onClick={() => setSelectedNode(null)} className="text-xs text-[#908fa0] hover:text-white">Close</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase text-[#908fa0] block mb-1">Node Title Label</label>
                <input
                  type="text"
                  value={selectedNode.data?.label || ''}
                  onChange={(e) => {
                    const updated = nodes.map(n => n.id === selectedNode.id ? { ...n, data: { ...n.data, label: e.target.value } } : n);
                    setNodes(updated);
                    setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, label: e.target.value } });
                    triggerSave();
                  }}
                  className="w-full bg-[#12131a] border border-[#464554]/60 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#6366f1]"
                />
              </div>

              {selectedNode.type === 'ai_agent' && (
                <div className="p-3 bg-[#12131a] border border-[#6366f1]/40 rounded-xl space-y-3">
                  <p className="text-xs font-semibold text-[#c0c1ff] flex items-center gap-1.5">
                    <Brain className="w-4 h-4 text-[#6366f1]" /> AI Engine Configuration
                  </p>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#908fa0] block mb-1">Select LLM Model</label>
                    <select 
                      value={selectedNode.data?.model || 'Gemini 1.5 Pro'}
                      onChange={(e) => {
                        const updated = nodes.map(n => n.id === selectedNode.id ? { ...n, data: { ...n.data, model: e.target.value } } : n);
                        setNodes(updated);
                        setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, model: e.target.value } });
                      }}
                      className="w-full bg-[#1e1f26] border border-[#464554] rounded-lg p-2 text-xs text-white focus:outline-none"
                    >
                      <option value="Gemini 1.5 Pro">Google Gemini 1.5 Pro</option>
                      <option value="OpenAI GPT-4o">OpenAI GPT-4o</option>
                      <option value="Claude 3.5 Sonnet">Anthropic Claude 3.5 Sonnet</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#908fa0] block mb-1">System Prompt Instruction</label>
                    <textarea 
                      rows="2"
                      placeholder="Extract sentiment score and key entities..."
                      className="w-full bg-[#1e1f26] border border-[#464554] rounded-lg p-2 text-xs text-white focus:outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {selectedNode.type === 'condition' && (
                <div className="p-3 bg-[#12131a] border border-amber-500/30 rounded-xl space-y-2">
                  <p className="text-xs font-semibold text-amber-400">Branching Rule</p>
                  <p className="text-[11px] text-[#908fa0]">Evaluates incoming JSON field `amount &gt; 10000`.</p>
                </div>
              )}

              {selectedNode.type === 'approval' && (
                <div className="p-3 bg-[#12131a] border border-purple-500/30 rounded-xl space-y-2">
                  <p className="text-xs font-semibold text-purple-400">Required Role</p>
                  <p className="text-[11px] text-[#908fa0]">Only organization Owner/Admin can sign off.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <AICopilotModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} onGenerateWorkflow={handleAIGenerate} />

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Remove Canvas Node?"
        message="Are you sure you want to delete this node from the visual graph? Any connected execution edges will be detached."
        confirmText="Delete Node"
        isDangerous={true}
        onConfirm={confirmDeleteNode}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};
