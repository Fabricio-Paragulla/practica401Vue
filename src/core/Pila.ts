/**
 * Clase genérica para implementar la estructura de datos Pila (Stack).
 * Sigue el principio LIFO (Last-In, First-Out).
 */
export class Pila<T> {
    // Array privado que almacena los elementos de la pila.
    private elementos: T[] = [];

    /**
     * Añade un elemento a la cima de la pila.
     * @param elemento El elemento a añadir.
     */
    push(elemento: T): void {
        this.elementos.push(elemento);
    }

    /**
     * Elimina y devuelve el elemento superior de la pila (LIFO).
     * @returns El elemento superior o undefined si la pila está vacía.
     */
    pop(): T | undefined {
        return this.elementos.pop();
    }

    /**
     * Devuelve el elemento superior sin eliminarlo (solo mira).
     * @returns El elemento superior o undefined si la pila está vacía.
     */
    peek(): T | undefined {
        return this.elementos[this.elementos.length - 1];
    }

    /**
     * Devuelve el número de elementos en la pila.
     */
    size(): number {
        return this.elementos.length;
    }

    /**
     * Comprueba si la pila está vacía.
     */
    isEmpty(): boolean {
        return this.elementos.length === 0;
    }

    /**
     * Devuelve una copia de los elementos subyacentes. Útil para iterar o reconstituir.
     */
    getElementos(): T[] {
        return [...this.elementos];
    }
    
    /**
     * Limpia completamente la pila, devolviendo los elementos retirados.
     */
    clear(): T[] {
        const removed = this.elementos;
        this.elementos = [];
        return removed;
    }
}