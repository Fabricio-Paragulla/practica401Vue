/**
 * Enumeración que define los posibles estados de una butaca en la sala de cine.
 */
export enum EstadoButaca {
    DISPONIBLE = 'disponible',
    SELECCIONADO = 'seleccionado',
    OCUPADO = 'ocupado',
    DANADO = 'danado', // Corregido el acento para facilitar el uso como clave CSS/JS
}

/**
 * Interfaz que representa una butaca individual.
 */
export interface IButaca {
    id: string; // Ej: A1, C14
    fila: number;
    columna: number;
    estado: EstadoButaca;
}

/**
 * Constante para el precio de la butaca (configurable)
 */
export const PRECIO_BUTACA = 12.00;