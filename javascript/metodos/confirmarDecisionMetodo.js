import { procesarDecisionProyecto } from '../services/procesarDecisionProyecto.js';

export function inicializarBotonesDecisionProyecto() {
  const modal = document.getElementById('decisionProyectoModal');
  console.log('Inicializando botones...', modal);

  const aprobarBtn = modal.querySelector('.btn-aprobar');
  const rechazarBtn = modal.querySelector('.btn-rechazar');
  const modificarBtn = modal.querySelector('.btn-modificaciones');

  // Validación rápida
  if (!aprobarBtn || !rechazarBtn || !modificarBtn) {
    console.error('No se encontraron uno o más botones en el modal');
    return;
  }

  aprobarBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const obs = modal.querySelector('textarea[name="descripcion"]').value;
    console.log('CLICK EN APROBAR');
    procesarDecisionProyecto('aprobado', obs);
  });

  rechazarBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const obs = modal.querySelector('textarea[name="descripcion"]').value;
    console.log('CLICK  RECHAZAR');
    procesarDecisionProyecto('rechazado', obs);
  });

  modificarBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const obs = modal.querySelector('textarea[name="descripcion"]').value;
    console.log('CLICK OBSERVAR');
    procesarDecisionProyecto('observado', obs);
  });
}
