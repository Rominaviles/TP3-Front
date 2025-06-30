import filtrarProyectos from '../fetchs/Gestion/filtrarProyecto.js';

export async function cargarResumenProyectos() {
  const usuarioId = localStorage.getItem('userId');

  if (!usuarioId) {
    console.error('Usuario no encontrado en localStorage');
    return;
  }

  const proyectos = await filtrarProyectos({ applicant: usuarioId });

  if (!Array.isArray(proyectos)) {
    console.error('No se pudieron obtener los proyectos');
    return;
  }

  let total = proyectos.length;
  let pendiente = 0;
  let aprobado = 0;
  let rechazado = 0;

  proyectos.forEach(p => {

    const estado = p.status?.toLowerCase() || '';

    if (estado === 'pendiente') pendiente++;
    else if (estado === 'aprobado') aprobado++;
    else if (estado === 'rechazado') rechazado++;
  });

  console.log(`Total: ${total}, Pendiente: ${pendiente}, Aprobado: ${aprobado}, Rechazado: ${rechazado}`);

  const contenedores = document.querySelectorAll('.estado-item .estado-valor');

  if (contenedores.length >= 4) {
    contenedores[0].textContent = total;
    contenedores[1].textContent = pendiente;
    contenedores[2].textContent = aprobado;
    contenedores[3].textContent = rechazado;
  }
}
