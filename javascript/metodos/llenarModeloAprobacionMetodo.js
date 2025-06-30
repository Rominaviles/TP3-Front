import obtenerProyectoPorId from '../fetchs/Gestion/obtenerProyectoPorId.js';
import { llenarModalDecisionProyecto } from '../mapeos/mapearProyectoDecision.js';
import { openModal } from './modalManejo.js';
import { inicializarBotonesDecisionProyecto } from './confirmarDecisionMetodo.js';

export async function mostrarModalAprobacionProyecto(idProyecto) {
  try {
    const proyecto = await obtenerProyectoPorId(idProyecto);
    if (!proyecto) throw new Error('No se encontró el proyecto');

    const esAprobador = proyecto.steps?.some(step => {
      const status = step.status?.[0]?.name?.toLowerCase() || step.status?.name?.toLowerCase();
      const rolId = Array.isArray(step.approverRole) ? step.approverRole[0]?.id : step.approverRole?.id;
      return status === 'pendiente' && rolId == localStorage.getItem('userRol');
    });

    if (esAprobador) {
      localStorage.setItem('proyectoSeleccionadoId', idProyecto);
      llenarModalDecisionProyecto(proyecto);
      openModal('decisionProyecto');
      inicializarBotonesDecisionProyecto(); 
    } else {
      alert('No tienes permiso para tomar decisiones en este proyecto.');
    }

  } catch (error) {
    console.error('Error al mostrar modal de aprobación:', error);
    alert('No se pudo cargar el proyecto.');
  }
}


