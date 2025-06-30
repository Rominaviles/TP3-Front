export default async function obtenerProyectoPorId(id) {
  const url = `https://localhost:7247/api/Project/${id}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Error al obtener proyecto');

    return await response.json();
  } catch (error) {
    console.error('Error en obtenerProyectoPorId:', error);
    return null;
  }
}