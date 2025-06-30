export default async function decidir(id, decisionDto) {
  const url = `https://localhost:7247/api/Project/${id}/decision`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(decisionDto),
    });

    if (!response.ok) throw new Error('Error al decidir paso');

    return await response.json();
  } catch (error) {
    console.error('Error en decidirPaso:', error);
    return null;
  }
}