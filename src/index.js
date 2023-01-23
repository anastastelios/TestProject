///////////////////////////// Prompt Dialog //////////////////////////////

const promptDIalog = () => {
  $('.popup-overlay, .popup-content').addClass('active');
};

if (!localStorage.getItem('runOnce')) {
  window.onload = promptDIalog();
  localStorage.setItem('runOnce', true);
}

$('.contact-btn, .popup-overlay').on('click', () => {
  $('.popup-overlay, .popup-content').removeClass('active');
});
