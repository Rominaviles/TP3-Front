export default async function obtenerAreas() {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch('https://localhost:7247/api/Information/Area', config);

    if (!response.ok) throw new Error('Error al obtener áreas');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en obtenerAreas:', error);
    return [];
  }
}