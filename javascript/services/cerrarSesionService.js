export function cerrarSesion() {
  localStorage.removeItem('userName');
  localStorage.removeItem('userId');
  localStorage.removeItem('usuarioEmail'); 

  window.location.href = 'index.html'; 
}