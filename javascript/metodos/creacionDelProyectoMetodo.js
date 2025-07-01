import obtenerAreas from '../fetchs/Informacion/obtenerArea.js';
import obtenerTiposProyecto from '../fetchs/Informacion/obtenerTipoProy.js';
import crearProyecto from '../fetchs/Gestion/crearProyecto.js';

import crearPayloadProyecto from '../services/crearPayloadProyectoService.js';
import mapearProyectoCreado from '../mapeos/mapearProyectoCreado.js';

export async function initFormCreateProject() {
    await cargarAreas();
    await cargarTiposProyecto();
    initFormHandler(); 
}

async function cargarAreas() {
    const selectArea = document.querySelector('select[name="area"]');
    if (!selectArea) return;

    selectArea.innerHTML = '<option value="">Seleccione un área</option>';

    try {
        const areas = await obtenerAreas();

        areas.forEach(area => {
            const option = document.createElement('option');
            option.value = area.id;
            option.textContent = area.name;
            selectArea.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar áreas:', error);
    }
}

async function cargarTiposProyecto() {
    const selectTipo = document.querySelector('select[name="tipoProyecto"]');
    if (!selectTipo) return;

    selectTipo.innerHTML = '<option value="">Seleccione el tipo</option>';

    try {
        const tipos = await obtenerTiposProyecto();

        tipos.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo.id;
            option.textContent = tipo.name;
            selectTipo.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar tipos de proyecto:', error);
    }
}

function initFormHandler() {
    const form = document.getElementById('createProjectForm');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const userId = localStorage.getItem('userId');

        if (!userId) {
            alert('Error: No se encontró el usuario logueado.');
            return;
        }

        const payload = crearPayloadProyecto(formData);

        try {
            const rawResponse = await crearProyecto(payload, userId);
            const nuevoProyecto = mapearProyectoCreado(rawResponse);

            console.log('Proyecto creado:', nuevoProyecto);
            alert('Proyecto creado con éxito');
            form.reset();

            const modal = document.getElementById('crearProyectoModal');
            modal.classList.remove('activo');

            // Refrescar la página
            location.reload();

        } catch (error) {
            console.error('Error detalle:', error);
            alert('Error al crear proyecto: ' + (error.message || 'Revisá los datos o la conexión.'));
        }
    });
}

export function observarModalcrearProyecto() {
    const modal = document.getElementById('crearProyectoModal');

    if (!modal) return;

    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (
                mutation.type === 'attributes' &&
                mutation.attributeName === 'class' &&
                modal.classList.contains('activo')
            ) {
                initFormCreateProject();
            }
        }
    });

    observer.observe(modal, { attributes: true });
}