const proyectos = await fetch('https://localhost:7247/api/Project/filter')
  .then(res => res.json());

 export function obtenerTotalesPorEstado(proyectos) {
  const resumen = {
    total: proyectos.length,
    pendientes: 0,
    aprobados: 0,
    rechazados: 0
  };

  proyectos.forEach(p => {
    const estado = (p.status?.[0]?.name || p.status?.name || '').toLowerCase();

    if (estado === 'pendiente') resumen.pendientes++;
    else if (estado === 'aprobado') resumen.aprobados++;
    else if (estado === 'rechazado') resumen.rechazados++;
  });

  return resumen;
}

export function actualizarResumenEnPantalla({ total, pendientes, aprobados, rechazados }) {
  document.querySelector('.estado-valor.total-proyecto').textContent = total;
  document.querySelector('.estado-valor.pendiente').textContent = pendientes;
  document.querySelector('.estado-valor.aprobado').textContent = aprobados;
  document.querySelector('.estado-valor.rechazado').textContent = rechazados;
}



