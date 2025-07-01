import { obtenerUsuariosParaSelect } from '../services/filtarUsuarioService.js';
import { usuariosEnSelect } from '../mapeos/mapearUsuarioFiltrado.js';

export async function cargarUsuariosEnSelect() {
  try {
    const usuarios = await obtenerUsuariosParaSelect();

    const selectElement = document.getElementById('responsableFiltrado');
    if (!selectElement) return;

      selectElement.querySelectorAll('option:not([value=""])').forEach(opt => opt.remove());

      usuariosEnSelect(usuarios, selectElement);

  } catch (error) {
    console.error('Error cargando usuarios para filtrado:', error);
  }
}

export async function cargarAprobadores() {
  try {
    const usuarios = await obtenerUsuariosParaSelect();

    const select = document.getElementById('aprobadorFiltrado'); 
    if (!select) return;

      select.querySelectorAll('option:not([value=""])').forEach(opt => opt.remove());
      
      usuariosEnSelect(usuarios, select);

    } catch (error) {
      console.error('Error cargando usuarios para filtrado:', error);
    }
}