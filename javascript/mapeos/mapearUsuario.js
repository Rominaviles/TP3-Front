export function buscarUsuarioPorEmail(listaUsuarios, email) {
  return listaUsuarios.find(usuario => usuario.email.toLowerCase() === email.toLowerCase());
}