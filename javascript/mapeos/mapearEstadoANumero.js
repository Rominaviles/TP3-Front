function mapearEstadoANumero(estado) {
  const estadosMap = {
    pendiente: 1,
    aprobado: 2,
    rechazado: 3,
    observado: 4
  };

  return estadosMap[estado.toLowerCase()] || 1;
}

export { mapearEstadoANumero };