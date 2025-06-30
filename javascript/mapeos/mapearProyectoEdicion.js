export function llenarModalEdicionProyecto(proyecto = null) {
  const modal = document.getElementById('editarProyectoModal');
  
  if (!modal) {
    throw new Error('Modal de edición no encontrado');
  }

  // Selectores ACTUALIZADOS según tu console.log
  const tituloInput = modal.querySelector('input[name="titulo"]');
  const descripcionInput = modal.querySelector('textarea[name="descripcion"]');
  const duracionInput = modal.querySelector('input[name="duracion"]');
  
  // Debug: Verificar exactamente qué se está encontrando
  console.log('Elementos encontrados:', {
    titulo: tituloInput,
    descripcion: descripcionInput,
    duracion: duracionInput,
    valores: {
      titulo: tituloInput?.value,
      descripcion: descripcionInput?.value,
      duracion: duracionInput?.value
    }
  });

  if (!tituloInput || !descripcionInput || !duracionInput) {
    throw new Error('No se encontraron todos los campos. Verifique los nombres: titulo, descripcion, duracion');
  }

  // Modo llenado (cuando se pasa un proyecto)
  if (proyecto) {
    tituloInput.value = proyecto.projectTitle || '';
    descripcionInput.value = proyecto.projectDescription || '';
    duracionInput.value = proyecto.estimatedDuration || '';
    return;
  }

  // Modo guardado (extraer datos)
  const datos = {
    projectTitle: tituloInput.value.trim(),
    projectDescription: descripcionInput.value.trim(),
    estimatedDuration: parseInt(duracionInput.value.trim()),
    proyectoId: localStorage.getItem('proyectoIdActivo')
  };

  // Validaciones
  if (!datos.projectTitle) throw new Error('El título es requerido');
  if (!datos.projectDescription) throw new Error('La descripción es requerida');
  if (isNaN(datos.estimatedDuration)) throw new Error('Duración debe ser número válido');

  return datos;
}

export function obtenerDatosDelModal() {
  const modal = document.getElementById('editarProyectoModal');
  const tituloInput = modal.querySelector('input[name="titulo"]');
  const descripcionInput = modal.querySelector('textarea[name="descripcion"]');
  const duracionInput = modal.querySelector('input[name="duracion"]');

  if (!tituloInput || !descripcionInput || !duracionInput) {
    throw new Error('Faltan campos del formulario');
  }

  return {
    proyectoId: localStorage.getItem('proyectoIdActivo'),
    projectTitle: tituloInput.value.trim(),
    projectDescription: descripcionInput.value.trim(),
    estimatedDuration: parseInt(duracionInput.value.trim()),
  };
}
