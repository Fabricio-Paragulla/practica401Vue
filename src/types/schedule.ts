export interface IAsignatura {
    nombre: string;
    profesor: string;
    grupo: string;
    color?: string; // Opcional: para darle colorines como en tu imagen
}

// Un bloque puede tener una asignatura o estar libre (null)
export type BloqueHorario = IAsignatura | null;
export type HorarioAula = BloqueHorario[][];
// Diccionario de horarios por nombre de aula
export type HorariosData = Record<string, HorarioAula>;

export const DIAS_SEMANA = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
export const HORAS_CLASE = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'];