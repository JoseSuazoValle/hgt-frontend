export interface Notificacion 
{
    id: number,
    usuarioReceptor: string,
    nombreNotificante: string;
    encabezado: string,
    createdAt: string,
    hora: string,
    idRequerimiento: number,
    isChecked: boolean,
    foto: string
}
