import { obtenerEstadosParaSelect } from '../services/filtrarEstadosService.js';
import { estadosEnSelect } from '../mapeos/mapearEstadoFiltrado.js';

export async function cargarEstadosEnSelect() {
  try {
    const estados = await obtenerEstadosParaSelect();
    const selectElement = document.getElementById('estadoFiltrado');
    if (!selectElement) return;

    selectElement.querySelectorAll('option:not([value=""])').forEach(opt => opt.remove());

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Todos los estados';
    selectElement.appendChild(defaultOption);

    estadosEnSelect(estados, selectElement);
  } catch (error) {
    console.error('Error cargando estados para filtrado:', error);
  }
}