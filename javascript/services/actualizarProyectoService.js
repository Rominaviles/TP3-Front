import actualizarProyecto from '../fetchs/Gestion/actualizarProyecto.js';
import { extraerDatosEdicionProyecto } from '../mapeos/mapearProyectoEdicion.js';

export async function guardarCambiosProyecto() {
  const { projectTitle, projectDescription, estimatedDuration, proyectoId } = extraerDatosEdicionProyecto();
  console.log("Datos extraídos del modal:", datos);

  if (!projectTitle || !projectDescription) throw new Error('El título y la descripción son obligatorios');
  const duracion = parseFloat(estimatedDuration);
  if (isNaN(duracion) || duracion <= 0) throw new Error('La duración debe ser un número mayor a 0');

  const dto = {
    projectTitle: projectTitle.trim(),
    projectDescription: projectDescription.trim(),
    estimatedDuration: duracion
  };

  console.log(' Enviando DTO:', JSON.stringify(dto, "", 2));

  const resultado = await actualizarProyecto(proyectoId, dto);

  if (!resultado) throw new Error('No se pudo actualizar el proyecto');
  return resultado;
}

