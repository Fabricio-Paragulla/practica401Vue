import { ref, computed, reactive } from 'vue';
import { 
    type HorariosData, 
    type HorarioAula, 
    type IAsignatura, 
    DIAS_SEMANA, 
    HORAS_CLASE 
} from '../types/schedule';

const aulasDisponibles = ['Laboratorio de Física', 'Aula 101', 'Salón de Actos'];

// Función auxiliar para crear un horario vacío
const crearHorarioVacio = (): HorarioAula => {
    // 5 días x N horas
    return Array(DIAS_SEMANA.length).fill(null).map(() => 
        Array(HORAS_CLASE.length).fill(null)
    );
};

// Datos iniciales mockeados
const datosIniciales: HorariosData = {
    'Laboratorio de Física': crearHorarioVacio(),
    'Aula 101': crearHorarioVacio(),
    'Salón de Actos': crearHorarioVacio(),
};

datosIniciales['Laboratorio de Física']![0]![1] = { nombre: 'Álgebra Lineal', profesor: 'Dra. Gómez', grupo: 'Grupo B', color: 'bg-green-100 text-green-800' };
datosIniciales['Laboratorio de Física']![2]![0] = { nombre: 'Cálculo I', profesor: 'Dr. Pérez', grupo: 'Grupo A', color: 'bg-blue-100 text-blue-800' };

const horarios = reactive<HorariosData>(datosIniciales);
const aulaSeleccionada = ref(aulasDisponibles[0]);

export function useGestorHorarios() {
    const modalAbierto = ref(false);
    const seleccion = reactive({
        diaIndex: -1,
        horaIndex: -1
    });
    
    const formulario = reactive<IAsignatura>({
        nombre: '',
        profesor: '',
        grupo: '',
        color: 'bg-purple-100 text-purple-800'
    });

    const horarioVisible = computed(() => {
        const aula = aulaSeleccionada.value;
        return (aula && horarios[aula]) || crearHorarioVacio();
    });

    const abrirModal = (diaIndex: number, horaIndex: number) => {
        seleccion.diaIndex = diaIndex;
        seleccion.horaIndex = horaIndex;
        
        const reservaExistente = horarioVisible.value?.[diaIndex]?.[horaIndex];
        
        if (reservaExistente) {
            // Modo Edición: Copiamos datos
            formulario.nombre = reservaExistente.nombre;
            formulario.profesor = reservaExistente.profesor;
            formulario.grupo = reservaExistente.grupo;
        } else {
            // Modo Creación: Limpiamos formulario
            formulario.nombre = '';
            formulario.profesor = '';
            formulario.grupo = '';
        }
        modalAbierto.value = true;
    };

    const cerrarModal = () => {
        modalAbierto.value = false;
    };

    const guardarReserva = () => {
        if (!formulario.nombre || !formulario.profesor) return; // Validación básica

        // Guardamos en la matriz
        // Asignamos un color aleatorio si es nuevo, o mantenemos lógica de colores
        const colores = ['bg-blue-100 text-blue-800', 'bg-green-100 text-green-800', 'bg-yellow-100 text-yellow-800', 'bg-purple-100 text-purple-800'];
        const colorRandom = colores[Math.floor(Math.random() * colores.length)];

        const fila = horarioVisible.value[seleccion.diaIndex];
        if (fila) {
            fila[seleccion.horaIndex] = {
                ...formulario,
                color: colorRandom
            };
        }
        cerrarModal();
    };

    const eliminarReserva = () => {
        if (confirm('¿Estás seguro de eliminar esta reserva?')) {
            const fila = horarioVisible.value[seleccion.diaIndex];
            if (fila) {
                fila[seleccion.horaIndex] = null;
            }
            cerrarModal();
        }
    };

    return {
        aulasDisponibles,
        aulaSeleccionada,
        horarioVisible,
        DIAS_SEMANA,
        HORAS_CLASE,
        modalAbierto,
        formulario,
        abrirModal,
        cerrarModal,
        guardarReserva,
        eliminarReserva,
        getReserva: (d: number, h: number) => horarioVisible.value?.[d]?.[h]
    };
}