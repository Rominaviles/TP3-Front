export function mapearProyectoFilas(proyecto) {
  const divRow = document.createElement('div');

  const estado = normalizarEstado(proyecto.status); 
  const nombreEstadoLimpio = nombreEstado(proyecto.status); 
  const fecha = proyecto.date ?? '—';
  const solicitante = proyecto.applicantName ?? '—';
  const titulo = proyecto.title ?? '—';
  const id = proyecto.id;

  // Determinar clase especial
  if (estado === 'decision') {
    divRow.classList.add('tabla-row', 'aprobacion');
  } else if (proyecto.needsChanges) {
    divRow.classList.add('tabla-row', 'modificacion');
  } else {
    divRow.classList.add('tabla-row');
  }

  // Determinar botón y span extra
  let boton = '';
  let subtitulo = '';

  if (proyecto.needsChanges) {
    subtitulo = `<br> <span class="subtitulo-modificacion">✏ Requiere modificaciones</span>`;
    boton = `<button class="btn btn-secundario" data-modal-open="editarProyecto">Ver</button>`;
  } else if (estado === 'decision') {
    boton = `<button class="btn btn-secundario" data-modal-open="decisionProyecto">Ver</button>`;
  } else if (estado === 'pendiente') {
    boton = `<button class="btn btn-secundario" data-modal-open="verProyecto">Ver</button>`;
  } else {
    boton = `<button class="btn btn-secundario" onclick="viewProject('${id}')">Ver</button>`;
  }

  // Armar innerHTML
  divRow.innerHTML = `
    <div class="blanco">${titulo}${subtitulo}</div>
    <div><span class="estado-fondo ${estado}">${nombreEstadoLimpio}</span></div>
    <div class="blanco">${solicitante}</div>
    <div class="blanco">${fecha}</div>
    <div>${boton}</div>
  `;

  return divRow;
}

function normalizarEstado(status) {
  if (typeof status === 'string') return status.toLowerCase();
  switch (status) {
    case 1: return 'pendiente';
    case 2: return 'aprobado';
    case 3: return 'rechazado';
    case 4: return 'observado';
    case 5: return 'decision'; 
    default: return '';
  }
}

function nombreEstado(status) {
  if (typeof status === 'string') return capitalizar(status);
  switch (status) {
    case 1: return 'Pendiente';
    case 2: return 'Aprobado';
    case 3: return 'Rechazado';
    case 4: return 'Observado';
    case 5: return 'Por aprobar';
    default: return 'Desconocido';
  }
}

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}