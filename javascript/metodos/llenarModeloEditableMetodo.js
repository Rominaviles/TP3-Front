import obtenerProyectoPorId from '../fetchs/Gestion/obtenerProyectoPorId.js';
import { llenarModalProyecto } from '../mapeos/mapearProyectoVer.js';
import { openModal, closeModal } from './modalManejo.js';
import { llenarModalEdicionProyecto, obtenerDatosDelModal } from '../mapeos/mapearProyectoEdicion.js';
import { actualizarProyecto } from '../fetchs/Gestion/actualizarProyecto.js';
import { refrescarTablaProyectos } from '../mapeos/refrescarTabla.js';

export function inicializarBotonesVerProyecto() {
  const tabla = document.getElementById('tablaProyectos');
  const botonGuardar = document.querySelector('.btn-guardar');

  tabla.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-ver')) {
      const fila = e.target.closest('.tabla-row');
      const id = fila?.dataset.proyectoId;
      if (!id) return;

      const proyecto = await obtenerProyectoPorId(id);
      if (!proyecto) {
        alert('No se pudo obtener el proyecto.');
        return;
      }

      localStorage.setItem('proyectoIdActivo', id);
      const estado = (proyecto.status?.[0]?.name || '').toLowerCase();

      if (estado === 'observado') {
        openModal('editarProyecto');
        setTimeout(() => llenarModalEdicionProyecto(proyecto), 50);
      } else {
        openModal('verProyecto');
        setTimeout(() => llenarModalProyecto(proyecto), 50);
      }
    }
  });

  if (botonGuardar) {
    botonGuardar.addEventListener('click', async () => {
      try {
        const dto = obtenerDatosDelModal();

        if (!dto.projectTitle || !dto.projectDescription || isNaN(dto.estimatedDuration)) {
          alert("Todos los campos son obligatorios.");
          return;
        }

        await actualizarProyecto(dto.proyectoId, dto);
        closeModal('editarProyecto');
        await refrescarTablaProyectos();
        alert(" Proyecto actualizado correctamente.");
      } catch (error) {
        console.error("Error al actualizar:", error);
        alert("Hubo un error al actualizar el proyecto.");
      }
    });
  }
}
