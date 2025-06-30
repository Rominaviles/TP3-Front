export async function cargarProyectosUsuario() {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    console.warn('No se encontró usuario logueado en localStorage');
    return [];
  }

  try {
    const [proyectosSolicitante, proyectosAprobador] = await Promise.all([
      fetch(`https://localhost:7247/api/Project/filter?applicant=${userId}`)
        .then(res => res.ok ? res.json() : []),
      fetch(`https://localhost:7247/api/Project/filter?approvalUser=${userId}`)
        .then(res => res.ok ? res.json() : [])
    ]);

    const proyectosMap = new Map();
    proyectosSolicitante.forEach(p => proyectosMap.set(p.id, p));
    proyectosAprobador.forEach(p => proyectosMap.set(p.id, p));

    const proyectosRelacionados = Array.from(proyectosMap.values());

    const proyectosConDetalle = await Promise.all(
      proyectosRelacionados.map(async (p) => {
        try {
          const res = await fetch(`https://localhost:7247/api/Project/${p.id}`);
          if (!res.ok) throw new Error(`Error al obtener proyecto detalle ${p.id}`);
          return await res.json();
        } catch (error) {
          console.error(error);
          return null;
        }
      })
    );

    return proyectosConDetalle.filter(p => p !== null);

  } catch (error) {
    console.error("Error al cargar proyectos relacionados:", error);
    return [];
  }
}
