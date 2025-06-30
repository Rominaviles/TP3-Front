import { initModalEvents } from './metodos/modalManejo.js';
import { observarModalcrearProyecto } from './metodos/creacionDelProyecto.js';
import { cargarUsuariosEnSelect } from './metodos/usuarioFiltrado.js';
import { cargarAprobadores } from './metodos/usuarioFiltrado.js';
import { cargarEstadosEnSelect } from './metodos/estadoFiltrado.js';
import { initCerrarSesion } from './metodos/cierreSesionMetodo.js';
import { gestionarFiltrado } from './metodos/gestionFiltradoMetodo.js';
import { mostrarTablaProyectos } from './metodos/cargarProyectosTablaMetodos.js';
import { cargarResumenProyectos } from './metodos/cargarResumenProyecto.js';

document.addEventListener('DOMContentLoaded', () => {
    initModalEvents();
    observarModalcrearProyecto();
    cargarUsuariosEnSelect();
    cargarAprobadores();
    cargarEstadosEnSelect();
    initCerrarSesion();
    gestionarFiltrado();
    mostrarTablaProyectos();
    cargarResumenProyectos();

});