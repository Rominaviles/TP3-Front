import decidir from '../fetchs/Gestion/decision.js';
import { closeModal } from '../metodos/modalManejo.js'; 
import { mapearEstadoANumero } from '../mapeos/mapearEstadoANumero.js'

export async function procesarDecisionProyecto(estado, observaciones) {
  console.log('=== DEBUG INICIO ===');
  
  const proyectoId = localStorage.getItem('proyectoSeleccionadoId');
  const usuarioId = localStorage.getItem('userId'); 
  
  console.log('Proyecto ID:', proyectoId);
  console.log('Usuario ID:', usuarioId);
  console.log('Estado original:', estado);
  console.log('Observaciones:', observaciones);
  
  if (!proyectoId || !usuarioId) {
    console.log('❌ SALIENDO - Faltan datos');
    return;
  }

  // Convertir estado a número
  const estadoNumerico = mapearEstadoANumero(estado);
  
  const decisionDto = {
    user: parseInt(usuarioId),
    status: estadoNumerico,  
    observation: observaciones || ""
  };

  console.log('DTO a enviar:', decisionDto);
  console.log(`Enviando decisión: ${estado.toUpperCase()} (${estadoNumerico}) - Proyecto: ${proyectoId} - Observaciones: ${observaciones}`);

  try {
    const respuesta = await decidir(proyectoId, decisionDto);

    if (respuesta) {
      alert('Decisión registrada correctamente.');
      closeModal('decisionProyecto');
      location.reload();
    } else {
      alert('Ocurrió un error al registrar la decisión.');
    }
  } catch (error) {
    console.error('Error al procesar la decisión:', error);
    alert('No se pudo enviar la decisión al servidor.');
  }
}
