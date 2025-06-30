import { obtenerAreas } from '../fetchs/Informacion/obtenerArea.js';
import { areasEnSelect } from '../mapeos/mapearArea.js';

export async function cargarAreasEnSelect() {
  const areas = await obtenerAreas();
  const select = document.getElementById('selectArea');
  if (select && areas.length > 0) {
    areasEnSelect(areas, select);
  }
}