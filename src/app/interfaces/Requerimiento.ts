export interface Requerimiento{
    
    id: number,
    asunto: string,
    empresa: string,
    emisor: string,
    receptor: string,
    plazo: number,
    tipo: string,
    estado: string,
    detalle: string,
    createdAt: string,
    updatedAt: string,
    createdHour: string,
    updatedHour: string,
    updatedUser: string,
    cliente: string,
    foto: string,
    archivos: string,
    archivosnewName: string,
    isPrivate: boolean,
    isEditable: boolean
}