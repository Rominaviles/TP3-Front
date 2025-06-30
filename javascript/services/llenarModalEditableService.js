import obtenerProyectoPorId from '../fetchs/Gestion/obtenerProyectoPorId.js';
import { llenarModalEdicionProyecto } from '../mapeos/mapearProyectoVerEdision.js';
import actualizarProyecto from '../fetchs/Gestion/actualizarProyecto.js';
import { openModal } from '../metodos/modalManejo.js';

export async function mostrarModalEditarProyecto(idProyecto) {
  try {
    console.log(' Buscando proyecto con ID:', idProyecto);
    const proyecto = await obtenerProyectoPorId(idProyecto);
    if (!proyecto) throw new Error('No se encontró el proyecto');

    console.log('Proyecto obtenido:', proyecto);
    localStorage.setItem('proyectoIdActivo', idProyecto);

    console.log('Llenando modal de edición...');
    llenarModalEdicionProyecto(proyecto);

    console.log('Abriendo modal "editarProyecto"');
    openModal('editarProyecto');

    const botonGuardar = document.querySelector('.btn-guardar');
    if (!botonGuardar) {
      console.error(' Botón guardar no encontrado');
      return;
    }

    // Eliminar listeners anteriores si hay
    botonGuardar.replaceWith(botonGuardar.cloneNode(true));
    const nuevoBotonGuardar = document.querySelector('.btn-guardar');

    nuevoBotonGuardar.addEventListener('click', async () => {
      try {
        console.log('Botón guardar clickeado');

        const modal = document.getElementById('editarProyectoModal');
        const tituloInput = modal.querySelector('input[name="titulo"]');
        const descripcionInput = modal.querySelector('textarea[name="descripcion"]');
        const duracionInput = modal.querySelector('input[name="duracion"]');

        console.log('Inputs capturados:', {
          tituloInput,
          descripcionInput,
          duracionInput
        });

        if (!tituloInput || !descripcionInput || !duracionInput) {
          throw new Error('No se encontraron todos los campos del formulario');
        }

        const projectTitle = tituloInput.value.trim();
        const projectDescription = descripcionInput.value.trim();
        const estimatedDuration = parseInt(duracionInput.value.trim());

        if (!projectTitle) throw new Error('El título del proyecto es requerido');
        if (!projectDescription) throw new Error('La descripción del proyecto es requerida');
        if (isNaN(estimatedDuration)) throw new Error('La duración debe ser un número válido');

        const dto = { projectTitle, projectDescription, estimatedDuration };

        console.log('Enviando DTO al backend:', dto);
        await actualizarProyecto(idProyecto, dto);

        console.log('Proyecto actualizado exitosamente');
        document.getElementById('editarProyectoModal').style.display = 'none';
      } catch (error) {
        console.error(' Error al actualizar proyecto:', error);
        alert(`Error: ${error.message}`);
      }
    });
  } catch (error) {
    console.error(' Error al cargar proyecto:', error);
    alert('No se pudo cargar el proyecto para edición');
  }
}
