import obtenerUsuarios from '../fetchs/Informacion/obtenerUsuario.js';
import { buscarUsuarioPorEmail } from '../mapeos/usuarioMapeo.js';

export async function validarLogin(emailIngresado) {
  const listaUsuarios = await obtenerUsuarios();
  const usuarioEncontrado = buscarUsuarioPorEmail(listaUsuarios, emailIngresado);
  
  if (usuarioEncontrado) {
    localStorage.setItem("userName", usuarioEncontrado.name);
    localStorage.setItem("userId", usuarioEncontrado.id); 
    localStorage.setItem("userRol", usuarioEncontrado.role[0]?.id);
  }
  
  return usuarioEncontrado || null;
}