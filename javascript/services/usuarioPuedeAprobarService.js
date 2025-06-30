const usuarioId = localStorage.getItem('usuarioId');
const usuarioRol = localStorage.getItem('userRol');

const esAprobadorPendiente = proyecto.steps?.some(step => {
  // Estado del paso
  let stepStatus = '';
  if (step.status) {
    if (Array.isArray(step.status) && step.status.length > 0) {
      stepStatus = (step.status[0].name || '').toLowerCase();
    } else if (typeof step.status === 'object' && step.status.name) {
      stepStatus = step.status.name.toLowerCase();
    } else if (typeof step.status === 'string') {
      stepStatus = step.status.toLowerCase();
    }
  }

  const stepRoleId = Array.isArray(step.approverRole) && step.approverRole.length > 0 ? step.approverRole[0].id.toString() : null;

  return stepRoleId === userRoleId && stepStatus === 'pendiente';
});
