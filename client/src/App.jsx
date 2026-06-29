import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { SplashScreen } from './components/common/SplashScreen';
import { DeveloperModal } from './components/common/DeveloperModal';
import { AdminRouteGuard, OrgRouteGuard } from './routes/Guards';

// Public Authentication & Landing Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { OrgLoginPage } from './pages/auth/OrgLoginPage';
import { OrgRegisterPage } from './pages/auth/OrgRegisterPage';

// Super Admin Portal Components
import { SuperAdminLoginPage } from './pages/admin/SuperAdminLoginPage';
import { SuperAdminLayout } from './pages/admin/SuperAdminLayout';
import { SuperAdminDashboardPage } from './pages/admin/SuperAdminDashboardPage';
import { OrgManagementPage } from './pages/admin/OrgManagementPage';
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { PlatformMonitoringPage } from './pages/admin/PlatformMonitoringPage';
import { GlobalAuditLogsPage } from './pages/admin/GlobalAuditLogsPage';
import { DeveloperConsolePage } from './pages/admin/DeveloperConsolePage';

// Organization Tenant Portal Components
import { TenantLayout } from './components/layout/TenantLayout';
import { DashboardPage } from './pages/DashboardPage';
import { WorkflowsPage } from './pages/WorkflowsPage';
import { WorkflowBuilderPage } from './pages/WorkflowBuilderPage';
import { ExecutionsPage } from './pages/ExecutionsPage';
import { IntegrationsPage } from './pages/IntegrationsPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [devModalOpen, setDevModalOpen] = useState(false);

  return (
    <ErrorBoundary>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Landing & Authentication Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/welcome" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/app/login" element={<OrgLoginPage />} />
            <Route path="/app/register" element={<OrgRegisterPage />} />

            {/* Seamless Redirects for Direct URL Navigation */}
            <Route path="/about" element={<Navigate to="/app/about" replace />} />
            <Route path="/workflows" element={<Navigate to="/app/workflows" replace />} />
            <Route path="/executions" element={<Navigate to="/app/executions" replace />} />
            <Route path="/integrations" element={<Navigate to="/app/integrations" replace />} />
            <Route path="/audit-logs" element={<Navigate to="/app/audit-logs" replace />} />
            <Route path="/settings" element={<Navigate to="/app/settings" replace />} />

            {/* Portal 1: Super Admin Isolated Workspace */}
            <Route path="/admin/login" element={<SuperAdminLoginPage />} />
            <Route path="/admin" element={<AdminRouteGuard><SuperAdminLayout /></AdminRouteGuard>}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<SuperAdminDashboardPage />} />
              <Route path="organizations" element={<OrgManagementPage />} />
              <Route path="users" element={<UserManagementPage />} />
              <Route path="monitoring" element={<PlatformMonitoringPage />} />
              <Route path="audit-logs" element={<GlobalAuditLogsPage />} />
              <Route path="console" element={<DeveloperConsolePage />} />
            </Route>

            {/* Portal 2: Organization Tenant SaaS Workspace */}
            <Route path="/app" element={<OrgRouteGuard><TenantLayout /></OrgRouteGuard>}>
              <Route index element={<DashboardPage />} />
              <Route path="workflows" element={<WorkflowsPage />} />
              <Route path="workflows/builder/:id" element={<WorkflowBuilderPage />} />
              <Route path="executions" element={<ExecutionsPage />} />
              <Route path="integrations" element={<IntegrationsPage />} />
              <Route path="audit-logs" element={<AuditLogsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="about" element={<AboutPage />} />
            </Route>

            {/* Catch-all Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <DeveloperModal isOpen={devModalOpen} onClose={setDevModalOpen} />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}
