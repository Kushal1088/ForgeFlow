import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, default: 'kushal1088' },
  role: { type: String, enum: ['superadmin', 'owner', 'admin', 'builder', 'member', 'viewer'], default: 'member' },
  isSuperAdmin: { type: Boolean, default: false },
  organization_id: { type: String, default: 'org_enterprise_1' },
  status: { type: String, default: 'active' },
  lastLogin: { type: Date, default: Date.now }
}, { timestamps: true });

export const UserModel = mongoose.model('User', userSchema);
