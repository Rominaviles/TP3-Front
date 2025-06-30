export default function crearPayloadProyecto(formData) {
    return {
        title: formData.get('titulo'),
        description: formData.get('descripcion'),
        amount: parseFloat(formData.get('presupuesto')),
        duration: parseInt(formData.get('duracion')),
        area: parseInt(formData.get('area')),
        type: parseInt(formData.get('tipoProyecto')),
    };
}