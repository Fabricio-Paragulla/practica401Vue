import type { Palo, Valor } from '@/types/cards';

/**
 * Representa una carta individual de la baraja.
 */
export class Carta {
    // Usamos 'public' en el constructor para crear automáticamente las propiedades.
    constructor(public palo: Palo, public publicValor: Valor) {}

    /**
     * Alias para 'publicValor' para mejor legibilidad.
     */
    get valor(): Valor {
        return this.publicValor;
    }

    /**
     * Genera un nombre legible de la carta (ej. "7 de Corazones").
     */
    get nombre(): string {
        return `${this.publicValor} de ${this.palo}`;
    }

    /**
     * Determina si esta carta puede ser jugada sobre otra carta.
     * La regla es: coincide en palo O coincide en valor.
     * @param otraCarta La carta en la cima de la pila de descarte.
     * @returns True si es jugable, False en caso contrario.
     */
    esJugableSobre(otraCarta: Carta): boolean {
        return this.palo === otraCarta.palo || this.publicValor === otraCarta.publicValor;
    }
}