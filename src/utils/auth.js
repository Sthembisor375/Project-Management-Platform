export function isTokenExpired(token) {
  if (!token) return true;
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    if (!decoded.exp) return true;
    // exp is in seconds, Date.now() is in ms
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function getUserFromToken(token) {
  if (!token) return null;
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
}

export function getCurrentUser() {
  const token = localStorage.getItem("token");
  return getUserFromToken(token);
}

export function isClientUser() {
  const user = getCurrentUser();
  return user && user.role === 'client';
}

export function isAdminUser() {
  const user = getCurrentUser();
  return user && user.role === 'user';
} 