export default async function obtenerTiposProyecto() {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch('https://localhost:7247/api/Information/ProjectType', config);

    if (!response.ok) throw new Error('Error al obtener tipos de proyecto');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en obtenerTiposProyecto:', error);
    return [];
  }
}