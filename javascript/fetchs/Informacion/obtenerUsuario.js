export default async function obtenerUsuarios() {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch('https://localhost:7247/api/Information/User', config);

    if (!response.ok) throw new Error('Error al obtener usuarios');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en obtenerUsuarios:', error);
    return [];
  }
}