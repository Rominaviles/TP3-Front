export function llenarModalDecisionProyecto(proyecto) {
  if (!proyecto) return;

  document.querySelector('#decisionProyectoModal .proyecto-titulo').textContent = proyecto.title || '';
  document.querySelector('#decisionProyectoModal .subtitulo-proyecto').textContent = proyecto.description || '';

  const campos = document.querySelectorAll('#decisionProyectoModal .detalle-campo');

  campos[0].querySelector('div:nth-child(2)').textContent = proyecto.user?.[0]?.name || '';
  campos[1].querySelector('div:nth-child(2)').textContent = proyecto.type?.[0]?.name || '';
  campos[2].querySelector('div:nth-child(2)').textContent = proyecto.area?.[0]?.name || '';

  const estado = proyecto.status?.[0]?.name || 'Pendiente';
  const estadoSpan = campos[3].querySelector('.estado-fondo');
  estadoSpan.textContent = estado;
  estadoSpan.className = `estado-fondo ${estado.toLowerCase()}`;

  campos[4].querySelector('div:nth-child(2)').textContent = `$${(proyecto.amount || 0).toLocaleString()}`;
  campos[5].querySelector('div:nth-child(2)').textContent = `${proyecto.duration || 0} días`;

  // Observaciones vacías para que las escriba el aprobador
  document.querySelector('#decisionProyectoModal textarea[name="descripcion"]').value = '';

  // Workflow
  const workflowContainer = document.querySelector('#decisionProyectoModal .workflow');
  workflowContainer.innerHTML = '';

  const steps = proyecto.steps || [];
  const indexRechazado = steps.findIndex(s => s.status?.[0]?.name?.toLowerCase() === 'rechazado');
  const pasosAMostrar = indexRechazado !== -1 ? steps.slice(0, indexRechazado + 1) : steps;

  pasosAMostrar.forEach(step => {
    const estadoPaso = step.status?.[0]?.name?.toLowerCase() || 'pendiente';
    const icono = estadoPaso === 'aprobado' ? '✓' : estadoPaso === 'observado' ? '👁' : estadoPaso === 'rechazado' ? '✗' : '?';

    workflowContainer.innerHTML += `
      <div class="workflow-item">
        <div class="workflow-circulo ${estadoPaso}">${icono}</div>
        <div class="workflow-info">
          <div class="workflow-estado">${step.status?.[0]?.name || ''}</div>
          <div class="workflow-persona">${step.approverUser?.[0]?.name || ''}</div>
          <div class="workflow-rol">${step.approverRole?.[0]?.name || ''}</div>
        </div>
      </div>`;
  });
}
