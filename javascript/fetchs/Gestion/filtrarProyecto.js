export default async function filtrarProyectos({ title, status, applicant, approvalUser }) {
  const query = new URLSearchParams();

  if (title) query.append('title', title);
  if (status) query.append('status', status);
  if (applicant) query.append('applicant', applicant);
  if (approvalUser) query.append('approvalUser', approvalUser);

  const url = `https://localhost:7247/api/Project/filter?${query.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Error al filtrar proyectos');

    return await response.json();
  } catch (error) {
    console.error('Error en filtrarProyectos:', error);
    return [];
  }
}
