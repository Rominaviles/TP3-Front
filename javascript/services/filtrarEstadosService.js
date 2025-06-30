import obtenerEstados from '../fetchs/Informacion/obtenerEstados.js';

export async function obtenerEstadosParaSelect() {
  const estados = await obtenerEstados();
  return estados;
}