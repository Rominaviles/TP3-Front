export default async function obtenerRoles() {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch('https://localhost:7247/api/Information/Role', config);

    if (!response.ok) throw new Error('Error al obtener roles');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en obtenerRoles:', error);
    return [];
  }
}