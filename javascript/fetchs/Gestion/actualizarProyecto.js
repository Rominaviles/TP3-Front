export default async function actualizarProyecto(id, dto) {
  const url = `https://localhost:7247/api/Project/${id}`;
  
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error detalle backend:', errorText);
      throw new Error('Error al actualizar proyecto');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en actualizarProyecto:', error);
    return null;
  }
}