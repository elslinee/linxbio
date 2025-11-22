export function requireRole(user, roles = []) {
  if (!user) return false;
  return roles.includes(user.role);
}
