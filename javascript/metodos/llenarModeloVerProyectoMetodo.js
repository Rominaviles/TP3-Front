import obtenerProyectoPorId  from '../fetchs/Gestion/obtenerProyectoPorId.js';
import { llenarModalProyecto } from '../mapeos/mapearProyectoVer.js';
import { openModal } from './modalManejo.js';

export function inicializarBotonesVerProyecto() {
  const tabla = document.getElementById('tablaProyectos');

  tabla.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-ver')) {
      const fila = e.target.closest('.tabla-row');
      const id = fila?.dataset.proyectoId;
      if (!id) return;

      const proyecto = await obtenerProyectoPorId(id);
      if (proyecto) {
        llenarModalProyecto(proyecto);
        openModal('verProyecto');
      } else {
        alert('No se pudo obtener el proyecto.');
      }
    }
  });
}
