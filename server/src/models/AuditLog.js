import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  organization_id: { type: String, default: 'org_enterprise_1' },
  actor_id: { type: String },
  actor_name: { type: String, required: true },
  action: { type: String, required: true },
  resource_type: { type: String, default: 'workflow' },
  details: { type: Object, default: {} }
}, { timestamps: true });

export const AuditLogModel = mongoose.model('AuditLog', auditLogSchema);
