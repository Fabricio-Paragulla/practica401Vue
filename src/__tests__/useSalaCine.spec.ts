import { describe, it, expect, beforeEach } from 'vitest';
import { useSalaCine } from '../composables/useSalaCine';
import { EstadoButaca, PRECIO_BUTACA } from '../types/cinema';
import { type IButaca } from '../types/cinema';

describe('useSalaCine - Gestión de Reserva de Butacas', () => {
    let gestor: ReturnType<typeof useSalaCine>;

    beforeEach(() => {
        // Inicializamos el gestor antes de cada prueba
        gestor = useSalaCine();
    });

    // Test de Inicio: Verificar que la sala se crea correctamente
    it('Test 1: Estado Inicial - La sala debe ser una matriz y tener butacas', () => {
        // La sala se crea automáticamente al llamar a useSalaCine
        expect(gestor.sala.value).toBeInstanceOf(Array);
        expect(gestor.sala.value.length).toBeGreaterThan(0); // Debe tener filas
        expect(gestor.sala.value[0]?.length).toBeGreaterThan(0); // Debe tener columnas
        
        const butacaA1 = gestor.sala.value[0]?.[0];
        expect(butacaA1?.id).toBe('A1');
        expect(butacaA1?.estado).toBeDefined();
        // Verificamos que al menos una butaca sea de un estado conocido
        expect(Object.values(EstadoButaca)).toContain(butacaA1!.estado);
    });
    
    // Función auxiliar para encontrar una butaca Disponible para las pruebas
    const findButaca = (estado: EstadoButaca): IButaca => {
        for (const fila of gestor.sala.value) {
            const butaca = fila.find(b => b.estado === estado);
            if (butaca) return butaca;
        }
        throw new Error(`No se encontró ninguna butaca en estado ${estado}.`);
    };

    // Test de Selección: Disponible -> Seleccionado
    it('Test 2: Seleccionar Butaca - Debe cambiar de DISPONIBLE a SELECCIONADO', () => {
        const butaca = findButaca(EstadoButaca.DISPONIBLE);
        
        gestor.toggleButaca(butaca);
        
        expect(butaca.estado).toBe(EstadoButaca.SELECCIONADO);
        expect(gestor.seleccionActual.value).toContain(butaca);
        expect(gestor.totalPagar.value).toBe(PRECIO_BUTACA);
    });

    // Test de Deselección: Seleccionado -> Disponible
    it('Test 3: Deseleccionar Butaca - Debe cambiar de SELECCIONADO a DISPONIBLE', () => {
        const butaca = findButaca(EstadoButaca.DISPONIBLE); // La seleccionamos
        gestor.toggleButaca(butaca); 
        expect(butaca.estado).toBe(EstadoButaca.SELECCIONADO);
        
        // Ahora la deseleccionamos
        gestor.toggleButaca(butaca); 
        
        expect(butaca.estado).toBe(EstadoButaca.DISPONIBLE);
        expect(gestor.seleccionActual.value).not.toContain(butaca);
        expect(gestor.totalPagar.value).toBe(0);
    });
    
    // Test de Inmovilidad: Ocupado y Dañado no deben cambiar
    it('Test 4: Inmovilidad - OCUPADO y DAÑADO no deben cambiar de estado al hacer toggle', () => {
        const butacaOcupada = findButaca(EstadoButaca.OCUPADO);
        const estadoInicialOcupado = butacaOcupada.estado;
        
        gestor.toggleButaca(butacaOcupada);
        // Debe seguir OCUPADO
        expect(butacaOcupada.estado).toBe(estadoInicialOcupado); 
        
        const butacaDanada = findButaca(EstadoButaca.DANADO);
        const estadoInicialDanado = butacaDanada.estado;
        
        gestor.toggleButaca(butacaDanada);
        // Debe seguir DAÑADO
        expect(butacaDanada.estado).toBe(estadoInicialDanado);
    });

    // Test de Lógica de Reserva
    it('Test 5: Confirmar Reserva - Las butacas seleccionadas deben pasar a OCUPADO', () => {
        const butaca1 = findButaca(EstadoButaca.DISPONIBLE);
        // Hacemos el toggle de la primera
        gestor.toggleButaca(butaca1); 
        
        const butaca2 = findButaca(EstadoButaca.DISPONIBLE);
        // Hacemos el toggle de la segunda
        gestor.toggleButaca(butaca2); 
        
        const totalSeleccionado = gestor.seleccionActual.value.length;
        expect(totalSeleccionado).toBe(2);
        
        // Confirmar la reserva
        gestor.confirmarReserva();
        
        // Verificaciones
        expect(butaca1.estado).toBe(EstadoButaca.OCUPADO);
        expect(butaca2.estado).toBe(EstadoButaca.OCUPADO);
        expect(gestor.seleccionActual.value.length).toBe(0);
        expect(gestor.mensajeSistema.value).toContain('Reserva confirmada');
    });

    // Test de Cálculos
    it('Test 6: Cálculos - El total a pagar debe reflejar la cantidad de butacas seleccionadas', () => {
        const butaca1 = findButaca(EstadoButaca.DISPONIBLE);
        gestor.toggleButaca(butaca1); 

        expect(gestor.totalPagar.value).toBe(PRECIO_BUTACA * 1);
        
        const butaca2 = findButaca(EstadoButaca.DISPONIBLE);
        gestor.toggleButaca(butaca2); 

        expect(gestor.totalPagar.value).toBe(PRECIO_BUTACA * 2);
    });
});