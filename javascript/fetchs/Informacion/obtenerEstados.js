export default async function obtenerEstados() {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch('https://localhost:7247/api/Information/ApprovalStatus', config);

    if (!response.ok) throw new Error('Error al obtener estados de aprobación');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en obtenerEstadosAprobacion:', error);
    return [];
  }
}