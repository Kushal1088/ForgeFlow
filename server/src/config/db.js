import mongoose from 'mongoose';
import { UserModel } from '../models/User.js';
import { OrganizationModel } from '../models/Organization.js';
import { WorkflowModel } from '../models/Workflow.js';
import { ExecutionModel } from '../models/Execution.js';
import { AuditLogModel } from '../models/AuditLog.js';

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/forgeflow';
    await mongoose.connect(connStr);
    console.log(`🍃 MongoDB Connected successfully to database: forgeflow`);

    // 1. Seed Users (Super Admin + Demo Users)
    const userCount = await UserModel.countDocuments();
    if (userCount <= 1) {
      await UserModel.deleteMany({ isSuperAdmin: { $ne: true } });
      
      // Ensure Super Admin
      const superAdminExists = await UserModel.findOne({ isSuperAdmin: true });
      if (!superAdminExists) {
        await UserModel.create({
          name: 'Kushal Pandey',
          email: 'kushal@forgeflow.io',
          password: 'kushal1088',
          role: 'superadmin',
          isSuperAdmin: true,
          organization_id: 'global_admin'
        });
      }

      // Seed Standard Users
      await UserModel.create([
        {
          name: 'Alex Mercer',
          email: 'admin@forgeflow.io',
          password: 'kushal1088',
          role: 'owner',
          organization_id: 'org_enterprise_1',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        },
        {
          name: 'Dev DevOps Team',
          email: 'dev@forgeflow.io',
          password: 'kushal1088',
          role: 'builder',
          organization_id: 'org_dev_2'
        }
      ]);
      console.log(`👤 Seeded Users into MongoDB Atlas (Kushal Pandey & Alex Mercer)`);
    }

    // 2. Seed Default Tenant Organizations
    const orgCount = await OrganizationModel.countDocuments();
    if (orgCount === 0) {
      await OrganizationModel.create([
        {
          name: 'Acme Global Corp',
          slug: 'acme-global',
          tier: 'Enterprise Scale',
          status: 'Active',
          mrr: '$18,400'
        },
        {
          name: 'DevOps Platform Team',
          slug: 'devops-team',
          tier: 'Pro Plan',
          status: 'Active',
          mrr: '$6,400'
        }
      ]);
      console.log(`🏢 Seeded Organizations into MongoDB Atlas (Acme Global & DevOps Team)`);
    }

    // 3. Seed Workflows Collection
    const wfCount = await WorkflowModel.countDocuments();
    if (wfCount === 0) {
      await WorkflowModel.create([
        {
          name: 'Enterprise Purchase Order Approval',
          description: 'Automated high-value procurement approval chain with Slack & Email notifications',
          status: 'active',
          version: 2,
          trigger_type: 'webhook',
          nodes: [
            { id: 'node_1', type: 'trigger', data: { label: 'Inbound Purchase Webhook' }, position: { x: 100, y: 150 } },
            { id: 'node_2', type: 'condition', data: { label: 'Amount > $10,000' }, position: { x: 350, y: 150 } },
            { id: 'node_3', type: 'approval', data: { label: 'VP Finance Sign-off' }, position: { x: 600, y: 150 } }
          ],
          edges: [
            { id: 'e1-2', source: 'node_1', target: 'node_2' },
            { id: 'e2-3', source: 'node_2', target: 'node_3' }
          ]
        },
        {
          name: 'AI Customer Sentiment Analysis & Alert',
          description: 'Extract customer support ticket insights and trigger automated Slack escalation',
          status: 'active',
          version: 1,
          trigger_type: 'schedule',
          nodes: [
            { id: 'n1', type: 'trigger', data: { label: 'Scheduled Cron Execution' }, position: { x: 100, y: 150 } },
            { id: 'n2', type: 'ai_agent', data: { label: 'Gemini AI Sentiment Extraction' }, position: { x: 400, y: 150 } }
          ],
          edges: [{ id: 'e1-2', source: 'n1', target: 'n2' }]
        }
      ]);
      console.log(`⚡ Seeded Enterprise Workflows into MongoDB Atlas`);
    }

    // 4. Seed Executions Collection
    const execCount = await ExecutionModel.countDocuments();
    if (execCount === 0) {
      await ExecutionModel.create([
        {
          workflow_id: 'wf_enterprise_order',
          workflow_name: 'Enterprise Purchase Order Approval',
          status: 'completed',
          trigger_data: { amount: 12500, requester: 'Finance Dept' },
          logs: [
            { node_id: 'node_1', label: 'Inbound Purchase Webhook', status: 'success', timestamp: new Date().toISOString() },
            { node_id: 'node_2', label: 'Evaluate Amount > $10,000', status: 'success', timestamp: new Date().toISOString() }
          ]
        },
        {
          workflow_id: 'wf_ai_sentiment',
          workflow_name: 'AI Customer Sentiment Analysis & Alert',
          status: 'completed',
          trigger_data: { payload: 'Customer feedback' },
          logs: [
            { node_id: 'n1', label: 'Cron Trigger', status: 'success', timestamp: new Date().toISOString() }
          ]
        }
      ]);
      console.log(`📊 Seeded Execution Runs into MongoDB Atlas`);
    }

    // 5. Seed Audit Logs Collection
    const auditCount = await AuditLogModel.countDocuments();
    if (auditCount === 0) {
      await AuditLogModel.create([
        {
          actor_id: 'usr_superadmin',
          actor_name: 'Kushal Pandey (Super Admin)',
          action: 'MONGODB_ATLAS_CONNECTED',
          resource_type: 'database',
          details: { db: 'forgeflow', status: 'Optimal' }
        },
        {
          actor_id: 'usr_alex',
          actor_name: 'Alex Mercer (Owner)',
          action: 'CREATED_WORKFLOW',
          resource_type: 'workflow',
          details: { workflow_name: 'Enterprise Purchase Order Approval' }
        }
      ]);
      console.log(`🛡️ Seeded Security Audit Logs into MongoDB Atlas`);
    }

  } catch (error) {
    console.warn(`⚠️ MongoDB connection warning: ${error.message}. Running in fallback mode.`);
  }
};
