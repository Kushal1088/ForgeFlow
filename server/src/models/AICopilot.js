import mongoose from 'mongoose';

const AICopilotSessionSchema = new mongoose.Schema({
  session_id: { type: String, required: true, unique: true },
  user_id: { type: String, default: 'usr_demo_123' },
  user_name: { type: String, default: 'Alex Mercer' },
  module: { 
    type: String, 
    enum: [
      'workflow_generator', 
      'form_generator', 
      'workflow_optimizer', 
      'business_insights', 
      'error_analyzer', 
      'approval_summary', 
      'semantic_search', 
      'doc_generator',
      'general'
    ],
    default: 'general'
  },
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  tokens_used: { type: Number, default: 150 },
  generated_artifact: { type: mongoose.Schema.Types.Mixed, default: null },
  createdAt: { type: Date, default: Date.now }
});

export const AICopilotModel = mongoose.model('AICopilotSession', AICopilotSessionSchema);
