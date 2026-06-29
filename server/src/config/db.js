import mongoose from 'mongoose';
import { UserModel } from '../models/User.js';
import { OrganizationModel } from '../models/Organization.js';
import { WorkflowModel } from '../models/Workflow.js';

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/forgeflow';
    await mongoose.connect(connStr);
    console.log(`🍃 MongoDB Connected successfully to database: forgeflow`);

    // Seed Super Admin if not existing
    const superAdminCount = await UserModel.countDocuments({ isSuperAdmin: true });
    if (superAdminCount === 0) {
      await UserModel.create({
        name: 'Kushal Pandey',
        email: 'kushal@forgeflow.io',
        password: 'kushal1088',
        role: 'superadmin',
        isSuperAdmin: true,
        organization_id: 'global_admin'
      });
      console.log(`👑 Super Admin seeded into MongoDB: Kushal Pandey (kushal@forgeflow.io)`);
    }

    // Seed Default Tenant Organization if not existing
    const orgCount = await OrganizationModel.countDocuments();
    if (orgCount === 0) {
      await OrganizationModel.create({
        name: 'Acme Global Corp',
        slug: 'acme-global',
        tier: 'Enterprise Scale',
        status: 'Active',
        mrr: '$18,400'
      });
      console.log(`🏢 Default Tenant seeded into MongoDB: Acme Global Corp`);
    }
  } catch (error) {
    console.warn(`⚠️ MongoDB connection warning: ${error.message}. Running in fallback mode.`);
  }
};
