export default async function crearProyecto(payload, userId) {
  const url = `https://localhost:7247/api/Project?userId=${userId}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error detalle backend:', errorText);
      throw new Error('Error al crear proyecto');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en crearProyecto:', error);
    return null;
  }
}
