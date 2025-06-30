import { cargarProyectosUsuario } from '../services/cargarProyectoTablaService.js';
import { mapearProyectosATablaHTML } from '../mapeos/crearProyectosTabla.js';
import { mostrarModalEditarProyecto } from '../services/llenarModalEditableService.js';
import { mostrarModalAprobacionProyecto } from './llenarModeloAprobacionMetodo.js';
import { mostrarModalVerProyecto } from '../services/llenarModalVisualizacionService.js';

export async function mostrarTablaProyectos() {
  const proyectos = await cargarProyectosUsuario();
  const contenedorTabla = document.getElementById('tablaProyectos');

  if (!contenedorTabla) {
    console.error('No se encontró el contenedor #tablaProyectos en el DOM');
    return;
  }

  if (!proyectos || proyectos.length === 0) {
    contenedorTabla.innerHTML = '<p>No hay proyectos para mostrar.</p>';
    return;
  }

  const htmlTabla = `
    <div class="header-tabla">
      <div>Título</div>
      <div>Estado</div>
      <div>Tipo de Proyecto</div>
      <div>Área</div>
      <div>Acciones</div>
    </div>
    ${mapearProyectosATablaHTML(proyectos)}
  `;

  contenedorTabla.innerHTML = htmlTabla;

    const botonesVer = contenedorTabla.querySelectorAll('.btn-ver');
    botonesVer.forEach(boton => {
  boton.addEventListener('click', async (e) => {
    const fila = e.target.closest('.tabla-row');
    if (!fila) return;

    const proyectoId = fila.dataset.proyectoId;
    const estado = fila.dataset.estado;
    const requiereAprobacion = fila.dataset.requiereAprobacion === 'true';

    if (!proyectoId) {
      console.warn('Falta ID del proyecto en la fila.');
      return;
    }

    try {
      // USAR LOS DATA ATTRIBUTES EN LUGAR DE VERIFICAR NUEVAMENTE
      if (estado === 'observado') {
        mostrarModalEditarProyecto(proyectoId);
      } else if (requiereAprobacion) {
        mostrarModalAprobacionProyecto(proyectoId);
      } else {
        mostrarModalVerProyecto(proyectoId);
      }
    } catch (error) {
      console.error('Error al manejar el botón Ver:', error);
    }
  });

  });
}
