import obtenerProyectoPorId from '../fetchs/Gestion/obtenerProyectoPorId.js';
import { llenarModalProyecto } from '../mapeos/mapearProyectoVer.js';
import { openModal } from '../metodos/modalManejo.js';

/**
 * @param {number|string} id - ID del proyecto
 */
export async function mostrarModalVerProyecto(id) {
  const proyecto = await obtenerProyectoPorId(id);
  if (proyecto) {
    llenarModalProyecto(proyecto);
    openModal('verProyecto');
  } else {
    alert('No se pudo obtener el proyecto.');
  }
}
