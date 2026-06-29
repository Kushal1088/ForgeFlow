export const resolveTenant = (req, res, next) => {
  const orgId = req.headers['x-organization-id'] || 'org_demo_default';
  req.organizationId = orgId;
  req.userRole = req.headers['x-user-role'] || 'owner'; // default owner for demo
  next();
};

export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.userRole) {
      return res.status(403).json({ error: 'Access denied: No role associated' });
    }
    
    if (allowedRoles.includes(req.userRole) || req.userRole === 'owner') {
      return next();
    }
    
    return res.status(403).json({ error: `Access denied: Requires one of [${allowedRoles.join(', ')}]` });
  };
};
