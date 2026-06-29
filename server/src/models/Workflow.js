import mongoose from 'mongoose';

const workflowSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['draft', 'active', 'archived'], default: 'active' },
  version: { type: Number, default: 1 },
  trigger_type: { type: String, default: 'webhook' },
  nodes: { type: Array, default: [] },
  edges: { type: Array, default: [] },
  organization_id: { type: String, default: 'org_enterprise_1' }
}, { timestamps: true });

export const WorkflowModel = mongoose.model('Workflow', workflowSchema);
