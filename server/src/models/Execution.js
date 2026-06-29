import mongoose from 'mongoose';

const executionSchema = new mongoose.Schema({
  workflow_id: { type: String, required: true },
  organization_id: { type: String, default: 'org_enterprise_1' },
  workflow_name: { type: String, default: 'Enterprise Workflow' },
  status: { type: String, default: 'completed' },
  trigger_data: { type: Object, default: {} },
  logs: { type: Array, default: [] }
}, { timestamps: true });

export const ExecutionModel = mongoose.model('Execution', executionSchema);
