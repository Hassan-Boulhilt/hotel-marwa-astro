import { showNotification } from './notifications.js';

export function initBookingModal() {
  // DOM Elements
 // DOM Elements
  const bookButtons = document.querySelectorAll('.book-btn');
  const modalOverlay = document.getElementById('booking-modal');
  const closeModal = document.querySelector('.close-modal');
  const bookingForm = document.getElementById('booking-form');
  const selectedRoomInput = document.getElementById('selected-room');
  const roomPriceInput = document.getElementById('room-price');
  const checkInInput = document.getElementById('check-in');
  const checkOutInput = document.getElementById('check-out');
  const nightsInput = document.getElementById('nights');
  const totalPriceInput = document.getElementById('total-price');
  const submitBookingBtn = document.getElementById('submit-booking');
  const btnText = document.querySelector('.btn-text');
  const btnLoading = document.querySelector('.btn-loading');
  if (!bookButtons.length) return; // Exit if no booking buttons on page

  // Set minimum date for check-in to today
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;
  if (checkInInput) {
    checkInInput.min = todayStr;
  }

  // Open booking modal
  bookButtons.forEach(button => {
    button.addEventListener('click', () => {
      const room = button.getAttribute('data-room');
      const price = button.getAttribute('data-price');
      
      if (selectedRoomInput) selectedRoomInput.value = room;
      if (roomPriceInput) roomPriceInput.value = price;
      
      const bookingModalTitle = document.querySelector('.booking-modal h2');
      if (bookingModalTitle) {
        bookingModalTitle.textContent = `Book ${room}`;
      }

      if (modalOverlay) {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
      if (checkInInput && checkOutInput && nightsInput && roomPriceInput && totalPriceInput) {
        calculateTotal();
      }
    });
  });

  // Calculate nights and total price
  function calculateTotal() {
    if (checkInInput.value && checkOutInput.value) {
      const checkIn = new Date(checkInInput.value);
      const checkOut = new Date(checkOutInput.value);
      
      if (checkOut > checkIn) {
        const nights = Math.floor((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        nightsInput.value = `${nights} nights`;
        
        const pricePerNight = parseFloat(roomPriceInput.value);
        const totalPrice = pricePerNight * nights;
        totalPriceInput.value = `$${totalPrice.toFixed(2)}`;
      } else {
        nightsInput.value = 'Invalid dates';
        totalPriceInput.value = '$0.00';
      }
    }
  }

  // Close modal
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  // Close modal when clicking outside
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Event listeners for date changes
  if (checkInInput && checkOutInput) {
    checkInInput.addEventListener('change', () => {
      if (checkInInput.value) {
        const nextDay = new Date(checkInInput.value);
        nextDay.setDate(nextDay.getDate() + 1);
        
        const yyyy = nextDay.getFullYear();
        const mm = String(nextDay.getMonth() + 1).padStart(2, '0');
        const dd = String(nextDay.getDate()).padStart(2, '0');
        
        checkOutInput.min = `${yyyy}-${mm}-${dd}`;
      }
      calculateTotal();
    });

    checkOutInput.addEventListener('change', calculateTotal);
  }

  // Form submission
  if (bookingForm && btnText && btnLoading) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Show loading state
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline';
      
      // Simulate API call to Cloudflare Worker
      try {
        // This would be the actual API call in a real application
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate successful response
        const data = { success: true, bookingId: Math.floor(Math.random() * 10000) };
        
        if (data.success) {
          showNotification(`Booking confirmed! Your reservation ID is #${data.bookingId}`);
          modalOverlay.classList.remove('active');
          document.body.style.overflow = 'auto';
          bookingForm.reset();
        } else {
          showNotification('Booking failed. Please try again.', true);
        }
      } catch (error) {
        showNotification('An error occurred. Please try again.', true);
        console.error('Booking error:', error);
      } finally {
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
      }
    });
  }
}