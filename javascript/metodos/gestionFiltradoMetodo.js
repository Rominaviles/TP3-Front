import { filtrarProyectosEnMemoria } from '../services/filtrarProyecto.js';
import { mapearProyectosATablaHTML } from '../mapeos/crearProyectosTabla.js';
import { mostrarModalVerProyecto } from '../services/llenarModalVisualizacionService.js';
import { mostrarModalEditarProyecto } from '../services/llenarModalEditableService.js';
import { mostrarModalAprobacionProyecto } from '../metodos/llenarModeloAprobacionMetodo.js';

export async function gestionarFiltrado(proyectos) {
  const btn = document.getElementById('btnFiltrar');
  const tabla = document.getElementById('tablaProyectos');

  btn.addEventListener('click', async () => {
    const filtros = {
      titulo: document.getElementById('tituloFiltrado').value.trim(),
      estado: parseInt(document.getElementById('estadoFiltrado').value.trim()) || null,
      responsable: parseInt(document.getElementById('responsableFiltrado').value.trim()) || null,
      aprobador: parseInt(document.getElementById('aprobadorFiltrado').value.trim()) || null,
    };

    const proyectosFiltrados = await filtrarProyectosEnMemoria(proyectos, filtros);
    console.log('Proyectos filtrados:', proyectosFiltrados);

    const htmlTabla = `
      <div class="header-tabla">
        <div>Título</div>
        <div>Estado</div>
        <div>Tipo de Proyecto</div>
        <div>Área</div>
        <div>Acciones</div>
      </div>
      ${mapearProyectosATablaHTML(proyectosFiltrados)}
    `;

    tabla.innerHTML = htmlTabla;

    tabla.querySelectorAll('.btn-ver').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const fila = e.target.closest('.tabla-row');
      const id = fila?.dataset.proyectoId;
      const estado = fila?.dataset.estado;
      if (!id || !estado) return;

      const userId = localStorage.getItem('userId');

      try {
        const response = await fetch(`https://localhost:7247/api/Project/${id}`);
        if (!response.ok) throw new Error('No se pudo obtener el proyecto');
        const proyecto = await response.json();

        const esAprobador = proyecto.steps?.some(
          step => step.approverUser?.id == userId
        );

        if (estado === 'observado') {
            mostrarModalEditarProyecto(id);
          } else if (esAprobador && estado === 'decision') {
            mostrarModalAprobacionProyecto(id);
          } else {
            mostrarModalVerProyecto(id);
          }
        } catch (error) {
          console.error('Error al manejar botón Ver en filtrado:', error);
        }
      });
    });

  });
}

