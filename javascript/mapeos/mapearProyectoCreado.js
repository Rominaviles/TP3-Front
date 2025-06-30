export default function mapearProyectoCreado(data) {
    return {
        id: data.id,
        titulo: data.title,
        descripcion: data.description,
        estado: data.status?.name,
        area: data.area?.name,
        tipo: data.type?.name
    };
}