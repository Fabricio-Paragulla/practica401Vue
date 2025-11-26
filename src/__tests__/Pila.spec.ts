import { describe, it, expect, beforeEach } from 'vitest';
import { Pila } from '../core/Pila';

describe('Pila (Stack) - Estructura de Datos LIFO', () => {
    let pila: Pila<string>;

    // Inicializar una nueva pila antes de cada test
    beforeEach(() => {
        pila = new Pila<string>();
    });

    it('debería inicializarse vacía', () => {
        expect(pila.isEmpty()).toBe(true);
        expect(pila.size()).toBe(0);
        expect(pila.pop()).toBeUndefined();
        expect(pila.peek()).toBeUndefined();
    });

    it('debería seguir el principio LIFO (Last-In, First-Out) con push y pop', () => {
        // 1. push
        pila.push('Elemento A');
        pila.push('Elemento B');
        pila.push('Elemento C');

        expect(pila.size()).toBe(3);
        expect(pila.isEmpty()).toBe(false);

        // 2. pop (C es el último en entrar, debe ser el primero en salir)
        expect(pila.pop()).toBe('Elemento C');
        expect(pila.size()).toBe(2);

        // 3. pop
        expect(pila.pop()).toBe('Elemento B');
        expect(pila.size()).toBe(1);

        // 4. pop
        expect(pila.pop()).toBe('Elemento A');
        expect(pila.size()).toBe(0);
        expect(pila.isEmpty()).toBe(true);
    });

    it('debería devolver el elemento superior sin eliminarlo con peek', () => {
        pila.push('Fondo');
        pila.push('Cima');

        // peek debe devolver 'Cima'
        expect(pila.peek()).toBe('Cima');
        expect(pila.size()).toBe(2); // El tamaño no cambia

        // peek de nuevo
        expect(pila.peek()).toBe('Cima');
        expect(pila.size()).toBe(2); // El tamaño sigue sin cambiar
    });

    it('debería permitir limpiar la pila y obtener los elementos', () => {
        pila.push('C1');
        pila.push('C2');
        pila.push('C3');

        // Obtener una copia de los elementos
        const elementos = pila.getElementos();
        expect(elementos).toEqual(['C1', 'C2', 'C3']);
    });
});