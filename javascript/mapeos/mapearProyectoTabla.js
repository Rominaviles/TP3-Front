export function mapearProyectosATablaHTML(proyectos) {
  // Verificar si no hay proyectos o el array está vacío
  if (!proyectos || proyectos.length === 0) {
    return `
      <div class="tabla-row tabla-row-vacia">
        <div class="mensaje-sin-proyectos">
          No hay proyectos para mostrar
        </div>
      </div>
    `;
  }

  const claseEstado = (estado) => {
    switch ((estado || '').toLowerCase()) {
      case 'pending':
      case 'pendiente':
        return 'pendiente';
      case 'approved':
      case 'aprobado':
        return 'aprobado';
      case 'rejected':
      case 'rechazado':
        return 'rechazado';
      case 'observed':
      case 'observado':
        return 'observado';
      case 'decision':
      case 'por aprobar':
        return 'decision';
      default:
        return 'pendiente';
    }
  };

  const usuarioId = localStorage.getItem('userId'); 
  const usuarioRol = localStorage.getItem('userRol'); 

  const filasProyectos = proyectos.map(proy => {
    const estadoRaw = proy.estado || proy.status?.[0]?.name || proy.status?.name || proy.status;
    let estadoNormalizado = claseEstado(estadoRaw);

    const proyectoRechazado = proy.steps?.some(step => {
      const status = step.status?.[0]?.name?.toLowerCase() || step.status?.name?.toLowerCase() || step.status?.toLowerCase();
      return status === 'rechazado';
    });
    if (proyectoRechazado) return '';

    let claseExtra = '';
    let subtitulo = '';
    let modalDestino = 'verProyecto';

    const esAprobadorPendiente = proy.steps?.some(step => {
      const stepStatus = step.status?.[0]?.name?.toLowerCase() || step.status?.name?.toLowerCase() || step.status?.toLowerCase();
      const stepRol = Array.isArray(step.approverRole) ? step.approverRole[0]?.id : step.approverRole?.id;
      
      if (stepStatus === 'pendiente') {
        if (!step.approverUser || step.approverUser.length === 0) {
          return stepRol == usuarioRol;
        }
        const stepUser = Array.isArray(step.approverUser) ? step.approverUser[0] : step.approverUser;
        return stepRol == usuarioRol && stepUser?.id == usuarioId;
      }
      return false;
    });

    if (estadoNormalizado === 'observado') {
      claseExtra = 'modificacion';
      subtitulo = '<br><span class="subtitulo-modificacion">✏ Abierto a cambios</span>';
      modalDestino = 'editarProyecto';
    }

    if (esAprobadorPendiente) {
      claseExtra = 'aprobacion';
      estadoNormalizado = 'decision';
      subtitulo = '<br><span class="subtitulo-aprobacion">✏ Requiere aprobación</span>';
      modalDestino = 'decisionProyecto';
    }

    const botonVer = `
      <button class="btn btn-secundario btn-ver" 
              data-id="${proy.id}" 
              data-modal-open="${modalDestino}"
              data-requiere-aprobacion="${esAprobadorPendiente}">Ver</button>
    `;

    return `
      <div class="tabla-row ${claseExtra}" 
           data-proyecto-id="${proy.id}" 
           data-estado="${estadoNormalizado}"
           data-requiere-aprobacion="${esAprobadorPendiente}">
        <div class="blanco">${proy.titulo || proy.title}${subtitulo}</div>
        <div><span class="estado-fondo ${estadoNormalizado}">${estadoRaw}</span></div>
        <div>${Array.isArray(proy.type) ? proy.type[0]?.name : proy.type}</div>
        <div>${Array.isArray(proy.area) ? proy.area[0]?.name : proy.area}</div>
        <div>${botonVer}</div>
      </div>
    `;
  }).filter(fila => fila !== '').join(''); // Filtrar filas vacías

  // Si después de filtrar no hay filas válidas
  if (filasProyectos === '') {
    return `
      <div class="tabla-row tabla-row-vacia">
        <div class="mensaje-sin-proyectos">
          No hay proyectos para mostrar
        </div>
      </div>
    `;
  }

  return filasProyectos;
}