import { showNotification } from './notifications.js';

export function initAdminLogin() {
  const adminLoginBtn = document.getElementById('admin-login');
  
  if (!adminLoginBtn) return;
  
  adminLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('Admin login would open here. In a real application, this would show a login form.');
  });
}