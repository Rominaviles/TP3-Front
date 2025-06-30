import filtrarProyectos from '../fetchs/Gestion/filtrarProyecto.js';

export async function filtrarProyectosEnMemoria() {
  const title = document.getElementById('tituloFiltrado').value.trim();
  const status = document.getElementById('estadoFiltrado').value;
  const applicant = document.getElementById('responsableFiltrado').value;
  const approvalUser = document.getElementById('aprobadorFiltrado').value;
  const userId = localStorage.getItem('userId');

  return await filtrarProyectos({ title, status, applicant, approvalUser, userId });
}