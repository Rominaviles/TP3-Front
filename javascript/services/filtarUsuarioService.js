import obtenerUsuarios from '../fetchs/Informacion/obtenerUsuario.js';

export async function obtenerUsuariosParaSelect() {
  const usuarios = await obtenerUsuarios();
  return usuarios;
}
