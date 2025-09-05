import { initAdminLogin } from './admin.js';
import { initAnimations } from './animations.js';
import { initBookingModal } from './booking.js';
document.addEventListener('DOMContentLoaded', function() {
 

  // Initialize components
  initAnimations();
  initBookingModal();
  initAdminLogin();
  
  console.log('Luxury Haven site initialized');
});
