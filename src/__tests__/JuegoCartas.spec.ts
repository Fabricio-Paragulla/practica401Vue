import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { useJuego } from '../composables/useJuego';
import { Carta } from '../core/Carta';
import { Pila } from '../core/Pila';

describe('useJuego - Lógica del Juego de Cartas', () => {
    let juego: ReturnType<typeof useJuego>;

    // Creamos cartas base para tener una referencia predecible
    const carta7Corazones = new Carta('Corazones', '7');
    const carta7Picas = new Carta('Picas', '7');
    const cartaKDiamantes = new Carta('Diamantes', 'K');
    const carta8Treboles = new Carta('Tréboles', '8');
    const carta4Picas = new Carta('Picas', '4');

    beforeEach(() => {
        juego = useJuego();
    });

    it('Test de Inicio: Verificar estado inicial (Mazo 44, Mano 7, Descarte 1)', () => {
        juego.iniciarJuego();

        // Mazo inicial = 52. Reparto 7 + 1 = 8.
        expect(juego.cartasRestantesMazo.value).toBe(44);
        expect(juego.manoJugador.value.length).toBe(7);
        // El descarte debe tener 1 carta (la carta inicial)
        expect(juego.cartaSuperiorDescarte.value).toBeInstanceOf(Carta);
    });

    it('Test de Jugada Válida: La carta se mueve de la mano al descarte', () => {
        // Mockeamos el estado para un test predecible
        const mockMano = [cartaKDiamantes, carta7Picas];
        const mockDescarte = new Pila<Carta>();
        mockDescarte.push(carta7Corazones); // 7 de Corazones en descarte

        juego.__test__.manoJugador.value = mockMano;
        juego.__test__.descarte.value = mockDescarte;

        const cartaAJuagar = mockMano[1]!; // 7 de Picas (coincide valor 7)

        // Jugar la carta
        const esValida = juego.jugarCarta(cartaAJuagar);

        // Verificaciones
        expect(esValida).toBe(true);
        expect(juego.__test__.manoJugador.value.length).toBe(1); // Se quitó de la mano
        expect(juego.__test__.manoJugador.value).not.toContain(cartaAJuagar);
        expect(juego.cartaSuperiorDescarte.value).toEqual(cartaAJuagar); // Ahora es la nueva cima
        expect(juego.cartaSuperiorDescarte.value?.nombre).toBe('7 de Picas');
    });

    it('Test de Jugada Inválida: El estado no cambia', () => {
        // Mockeamos el estado
        const mockMano = [cartaKDiamantes, carta8Treboles];
        const mockDescarte = new Pila<Carta>();
        mockDescarte.push(carta7Corazones); // 7 de Corazones en descarte

        juego.__test__.manoJugador.value = mockMano;
        juego.__test__.descarte.value = mockDescarte;

        const cartaAJuagar = mockMano[0]!; // K de Diamantes (No coincide con 7 de Corazones)

        // Jugar la carta
        const esValida = juego.jugarCarta(cartaAJuagar);

        // Verificaciones
        expect(esValida).toBe(false);
        expect(juego.__test__.manoJugador.value.length).toBe(2); // La mano sigue igual
        expect(juego.cartaSuperiorDescarte.value).toEqual(carta7Corazones); // El descarte sigue igual
    });

    it('Test de Reconstitución de Mazo: El descarte se baraja y rellena el mazo', () => {
        // Preparamos cartas para simular el descarte
        const cartaSuperior = carta8Treboles;
        const cartasDescarte = [carta7Corazones, cartaKDiamantes, carta4Picas];
        
        // Mockeamos la pila de descarte con la carta superior y otras cartas
        const mockDescarte = new Pila<Carta>();
        cartasDescarte.forEach(c => mockDescarte.push(c));
        mockDescarte.push(cartaSuperior); // Esta es la cima que se debe mantener
        
        // Mockeamos el mazo como vacío
        const mockMazo = new Pila<Carta>();

        juego.__test__.mazo.value = mockMazo;
        juego.__test__.descarte.value = mockDescarte;
        
        // Comprobar estado inicial del test
        expect(juego.cartasRestantesMazo.value).toBe(0);
        
        // **CORRECCIÓN 4: Verificación de nulidad para evitar el error 'Carta | undefined'**
        const cartaCimaInicial = juego.cartaSuperiorDescarte.value;
        if (!cartaCimaInicial) throw new Error("Error en mock: El descarte debería tener una carta inicial.");

        expect(cartaCimaInicial).toEqual(cartaSuperior);

        // Disparamos la acción de robar, que debe activar la reconstitución
        juego.robarCarta();

        // Los cálculos del tamaño del mazo son correctos (3 cartas reconstituidas, 1 robada = 2 restantes)
        expect(juego.cartasRestantesMazo.value).toBe(2);
        
        // Verificar el descarte: debe tener solo la carta superior original
        expect(juego.cartaSuperiorDescarte.value).toEqual(cartaSuperior); // La cima es la misma
        
        // Verificamos el tamaño de la pila de descarte corregida (solo queda la carta superior)
        expect(juego.__test__.descarte.value.size()).toBe(1); 
        
        // Verificar que se robó una carta (se añadió a la mano)
        // La mano estaba vacía, se añadió 1, ahora size() es 1.
        // NOTA: Si en tu beforeEach la mano no se reseteara, esto podría fallar. Asumimos que se reseteó.
        expect(juego.__test__.manoJugador.value.length).toBe(1);
    });
});