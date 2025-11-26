import { ref, computed, type Ref } from 'vue';
import { EstadoButaca, type IButaca, PRECIO_BUTACA } from '@/types/cinema';

const FILAS_DEFAULT = 8;
const COLUMNAS_DEFAULT = 14;

/**
 * Genera la matriz inicial de butacas para la sala de cine.
 * @returns Matriz de butacas.
 */
function crearSalaInicial(): IButaca[][] {
    const sala: IButaca[][] = [];
    const estadosIniciales = [
        EstadoButaca.DISPONIBLE,
        EstadoButaca.OCUPADO,
        EstadoButaca.DANADO
    ];
    
    const getFilaLetra = (filaIndex: number): string => String.fromCharCode(65 + filaIndex);

    for (let f = 0; f < FILAS_DEFAULT; f++) {
        const fila: IButaca[] = [];
        const filaLetra = getFilaLetra(f);
        
        for (let c = 0; c < COLUMNAS_DEFAULT; c++) {
            const columnaNum = c + 1; // Columna empieza en 1
            const id = `${filaLetra}${columnaNum}`;
            
            // Asignación de estado inicial (aleatorio para simulación, pero con más disponibles)
            let estado = EstadoButaca.DISPONIBLE;
            if (Math.random() < 0.2) { // 20% de probabilidad de no estar disponible o ocupado
                 const randomIndex = Math.floor(Math.random() * estadosIniciales.length);
                    estado = estadosIniciales[randomIndex] || EstadoButaca.DISPONIBLE;
            }

            // Simulación de butacas dañadas fijas
            if (filaLetra === 'D' && (columnaNum === 7 || columnaNum === 8)) {
                estado = EstadoButaca.DANADO;
            }

            fila.push({
                id,
                fila: f,
                columna: c,
                estado: estado,
            });
        }
        sala.push(fila);
    }
    return sala;
}


export function useSalaCine() {
    // La matriz de butacas
    const sala: Ref<IButaca[][]> = ref(crearSalaInicial());
    const mensajeSistema = ref('');

    /**
     * Alterna el estado de una butaca entre DISPONIBLE y SELECCIONADO.
     * @param butaca La butaca sobre la que se hizo clic.
     */
    const toggleButaca = (butaca: IButaca) => {
        if (butaca.estado === EstadoButaca.DISPONIBLE) {
            butaca.estado = EstadoButaca.SELECCIONADO;
            mensajeSistema.value = `Has seleccionado la butaca ${butaca.id}.`;
        } else if (butaca.estado === EstadoButaca.SELECCIONADO) {
            butaca.estado = EstadoButaca.DISPONIBLE;
            mensajeSistema.value = `Has deseleccionado la butaca ${butaca.id}.`;
        } else if (butaca.estado === EstadoButaca.OCUPADO || butaca.estado === EstadoButaca.DANADO) {
            mensajeSistema.value = `La butaca ${butaca.id} no está disponible para la selección.`;
        }
    };

    /**
     * Confirma la reserva, cambiando todas las butacas SELECCIONADAS a OCUPADAS.
     */
    const confirmarReserva = () => {
        const butacasSeleccionadas = seleccionActual.value;
        if (butacasSeleccionadas.length === 0) {
            mensajeSistema.value = 'Debes seleccionar al menos una butaca para confirmar la reserva.';
            return;
        }

        // Itera y actualiza el estado
        sala.value.forEach(fila => {
            fila.forEach(butaca => {
                if (butaca.estado === EstadoButaca.SELECCIONADO) {
                    butaca.estado = EstadoButaca.OCUPADO;
                }
            });
        });

        mensajeSistema.value = `¡Reserva confirmada! ${butacasSeleccionadas.length} butacas reservadas. Total pagado: ${totalPagar.value.toFixed(2)} €`;
    };
    
    // Obtiene todas las butacas SELECCIONADAS
    const seleccionActual = computed(() => {
        const seleccion: IButaca[] = [];
        sala.value.forEach(fila => {
            fila.forEach(butaca => {
                if (butaca.estado === EstadoButaca.SELECCIONADO) {
                    seleccion.push(butaca);
                }
            });
        });
        return seleccion;
    });

    // Genera el resumen de IDs
    const resumenSeleccion = computed(() => {
        if (seleccionActual.value.length === 0) {
            return 'Ninguna butaca seleccionada';
        }
        return seleccionActual.value.map(b => b.id).join(', ');
    });

    // Calcula el total a pagar
    const totalPagar = computed(() => {
        return seleccionActual.value.length * PRECIO_BUTACA;
    });

    return {
        sala,
        toggleButaca,
        confirmarReserva,
        seleccionActual,
        resumenSeleccion,
        totalPagar,
        mensajeSistema,
        EstadoButaca, // Exponemos el Enum para que el template pueda usarlo
        PRECIO_BUTACA,
    };
}