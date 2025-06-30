export function initModalEvents() {

  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal-open');
      openModal(modalId);
    });
  });


  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal-close');
      closeModal(modalId);
    });
  });

  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('activo');
    }
  });
}

export function openModal(modalId) {
  const modal = document.getElementById(`${modalId}Modal`);
  if (modal) {
    modal.classList.add('activo');
  }
}

export function closeModal(modalId) {
  const modal = document.getElementById(`${modalId}Modal`);
  if (modal) {
    modal.classList.remove('activo');
  }
}
