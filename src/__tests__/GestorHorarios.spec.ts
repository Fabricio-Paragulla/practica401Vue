import { describe, it, expect, beforeEach } from 'vitest';
import { useGestorHorarios } from '../composables/useGestorHorarios';

describe('Gestor de Horarios - CRUD de Aulas', () => {
    let gestor: ReturnType<typeof useGestorHorarios>;

    beforeEach(() => {
        gestor = useGestorHorarios();
    });

    it('Test 1: Estado Inicial - Debe cargar datos del aula por defecto', () => {
        expect(gestor.aulaSeleccionada.value).toBe('Laboratorio de Física');
        expect(gestor.horarioVisible.value.length).toBe(5);
        expect(gestor.horarioVisible.value[0]?.length).toBe(6);
    });

    it('Test 2: Cambio de Aula - Debe mostrar una matriz diferente (o vacía)', () => {
        gestor.aulaSeleccionada.value = 'Aula 101';
        expect(gestor.horarioVisible.value[0]?.[1]).toBeNull();
    });

    it('Test 3: Añadir Reserva - Guardar debe actualizar la matriz', () => {
        gestor.abrirModal(0, 0);
        gestor.formulario.nombre = 'Nueva Asignatura';
        gestor.formulario.profesor = 'Profe Nuevo';
        gestor.formulario.grupo = 'G1';
        gestor.guardarReserva();

        const celda = gestor.getReserva(0, 0);
        expect(celda).not.toBeNull();
        expect(celda?.nombre).toBe('Nueva Asignatura');
    });

    it('Test 4: Modificar Reserva - Debe actualizar datos existentes', () => {
        // Creamos una reserva inicial
        const fila = gestor.horarioVisible.value[1];
        if (fila) {
            fila[1] = { 
                nombre: 'Vieja', profesor: 'Viejo', grupo: 'A' 
            };
        }
        gestor.abrirModal(1, 1);
        
        // Cambiamos datos en formulario
        gestor.formulario.nombre = 'Editada';
        
        // Guardamos
        gestor.guardarReserva();

        expect(gestor.getReserva(1, 1)?.nombre).toBe('Editada');
    });

    it('Test 5: Eliminar Reserva - Debe dejar la celda en null', () => {
        const fila = gestor.horarioVisible.value[2];
        if (fila) {
            fila[2] = { 
                nombre: 'Borrar', profesor: 'P', grupo: 'A' 
            };
        }
        
        // Mock de window.confirm para que devuelva true siempre
        global.confirm = () => true;

        gestor.abrirModal(2, 2);
        gestor.eliminarReserva();

        expect(gestor.getReserva(2, 2)).toBeNull();
    });
});