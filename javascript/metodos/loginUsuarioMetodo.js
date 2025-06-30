import { validarLogin } from '../services/loginService.js';

const formulario = document.getElementById('form-login');
const mensaje = document.getElementById('mensaje-login');

formulario.addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = document.getElementById('input-email').value.trim();

  const usuario = await validarLogin(email);

  if (usuario) {
    localStorage.setItem('usuarioEmail', usuario.email);
    localStorage.setItem('usuarioNombre', usuario.nombre || 'Usuario');
    localStorage.setItem('usuarioRol', usuario.role[0]?.id || '');
    window.location.href = './dashboard.html';
  } else {
    mensaje.textContent = 'Correo no registrado.';
    mensaje.style.color = 'red';
  }
});


