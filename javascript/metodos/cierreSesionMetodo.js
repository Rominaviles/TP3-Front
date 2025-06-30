import { cerrarSesion } from '../services/cerrarsesion.js';

export function initCerrarSesion() {
  const btnCerrar = document.getElementById('btnCerrarSesion');
  if (btnCerrar) {
    btnCerrar.addEventListener('click', () => {
      cerrarSesion();
    });
  }
}