export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('task-manager-token');
}

export function logout() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('task-manager-token');
  window.location.href = '/login';
}
