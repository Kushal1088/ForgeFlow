import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  tier: { type: String, default: 'Enterprise Scale' },
  status: { type: String, default: 'Active' },
  owner_id: { type: String },
  mrr: { type: String, default: '$18,400' }
}, { timestamps: true });

export const OrganizationModel = mongoose.model('Organization', organizationSchema);
