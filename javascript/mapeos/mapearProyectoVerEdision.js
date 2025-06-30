
export function llenarModalEdicionProyecto(proyecto) {
  if (!proyecto) return; 

  console.log('Cargando modal de edición para proyecto:', proyecto);


  setTimeout(() => {
    // Limpiar valores y establecer placeholders
    const inputTitulo = document.querySelector('#editarProyectoModal input[name="titulo"]');
    const textareaDescripcion = document.querySelector('#editarProyectoModal textarea[name="descripcion"]');
    const inputDuracion = document.querySelector('#editarProyectoModal input[name="duracion"]');

    console.log('Elementos encontrados después del timeout:');
    console.log('Input título:', inputTitulo);
    console.log('Textarea descripción:', textareaDescripcion);
    console.log('Input duración:', inputDuracion);

    // Limpiar y establecer placeholders
    if (inputTitulo) {
      inputTitulo.value = '';
      inputTitulo.removeAttribute('value');
      inputTitulo.placeholder = 'Ingrese nuevo título';
      inputTitulo.setAttribute('placeholder', 'Ingrese nuevo título');
      console.log('Título limpiado - placeholder:', inputTitulo.placeholder);
    }
    
    if (textareaDescripcion) {
      textareaDescripcion.value = '';
      textareaDescripcion.textContent = '';
      textareaDescripcion.placeholder = 'Ingrese nueva descripción';
      textareaDescripcion.setAttribute('placeholder', 'Ingrese nueva descripción');
      console.log('Descripción limpiada - placeholder:', textareaDescripcion.placeholder);
    }
    
    if (inputDuracion) {
      inputDuracion.value = '';
      inputDuracion.removeAttribute('value');
      inputDuracion.placeholder = 'Ingrese nueva duración en días';
      inputDuracion.setAttribute('placeholder', 'Ingrese nueva duración en días');
      console.log('Duración limpiada - placeholder:', inputDuracion.placeholder);
    }
  }, 100);

  // Llenar información de solo lectura
  const detallesModal = document.querySelector('#editarProyectoModal');
  if (detallesModal) {
    const solicitanteEl = detallesModal.querySelector('.detalle-campo:nth-child(1) div:nth-child(2)');
    if (solicitanteEl) solicitanteEl.textContent = proyecto.user?.[0]?.name || '';

    const tipoEl = detallesModal.querySelector('.detalle-campo:nth-child(2) div:nth-child(2)');
    if (tipoEl) tipoEl.textContent = proyecto.type?.[0]?.name || '';

    const areaEl = detallesModal.querySelector('.detalle-campo:nth-child(3) div:nth-child(2)');
    if (areaEl) areaEl.textContent = proyecto.area?.[0]?.name || '';

    const estado = proyecto.status?.[0]?.name || 'Pendiente';
    const estadoEl = detallesModal.querySelector('.detalle-campo:nth-child(4) .estado-fondo');
    if (estadoEl) {
      estadoEl.textContent = estado;
      estadoEl.className = `estado-fondo ${estado.toLowerCase()}`;
    }

    const montoEl = detallesModal.querySelector('.detalle-campo:nth-child(5) div:nth-child(2)');
    if (montoEl) montoEl.textContent = `$${(proyecto.amount || 0).toLocaleString()}`;

    const observacionesEl = detallesModal.querySelector('.observaciones div:nth-child(2)');
    if (observacionesEl) observacionesEl.textContent = proyecto.description || '';

    // Workflow
    const workflowContainer = detallesModal.querySelector('.workflow');
    if (workflowContainer) {
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
  }
}