export function llenarModalProyecto(proyecto) {
  if (!proyecto) return;

  document.getElementById('modalTitulo').textContent = proyecto.title || '';
  document.getElementById('modalDescripcion').textContent = proyecto.description || '';
  document.getElementById('modalSolicitante').textContent = proyecto.user?.[0]?.name || '';
  document.getElementById('modalTipoProyecto').textContent = proyecto.type?.[0]?.name || '';
  document.getElementById('modalArea').textContent = proyecto.area?.[0]?.name || '';

  const estado = proyecto.status?.[0]?.name || 'Pendiente';
  document.getElementById('modalEstado').innerHTML = `<span class="estado-fondo ${estado.toLowerCase()}">${estado}</span>`;
  document.getElementById('modalMonto').textContent = `$${(proyecto.amount || 0).toLocaleString()}`;
  document.getElementById('modalDuracion').textContent = `${proyecto.duration || 0} días`;
  document.getElementById('modalObservaciones').textContent = ' No hay observaciones todavía. ';

  const workflowContainer = document.getElementById('modalWorkflow');
  workflowContainer.innerHTML = '';

const steps = proyecto.steps || [];
const indexRechazado = steps.findIndex(step => step.status?.[0]?.name?.toLowerCase() === 'rechazado');

const pasosAMostrar = indexRechazado !== -1
  ? steps.slice(0, indexRechazado + 1) 
  : steps; 

workflowContainer.innerHTML = '';

pasosAMostrar.forEach(step => {
  console.log('Paso visible del workflow:', step);

  const estadoPaso = step.status?.[0]?.name?.toLowerCase() || 'pendiente';
  const icono = estadoPaso === 'aprobado' ? '✓' : estadoPaso === 'observado' ? '👁' : estadoPaso === 'rechazado' ? '✗' : '?';

  const nombreEstado = step.status?.[0]?.name || 'Pendiente';
  const nombreAprobador = step.approverUser?.[0]?.name || 'Sin nombre';
  const rolAprobador = step.approverRole?.[0]?.name || 'Sin rol';

  workflowContainer.innerHTML += 
    `<div class="workflow-item">
      <div class="workflow-circulo ${estadoPaso}">${icono}</div>
      <div class="workflow-info">
        <div class="workflow-estado">${nombreEstado}</div>
        <div class="workflow-persona">${nombreAprobador}</div>
        <div class="workflow-rol">${rolAprobador}</div>
      </div>
    </div>`
  ;
});
}