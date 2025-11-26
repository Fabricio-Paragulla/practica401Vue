import { ref, computed, readonly, type Ref } from 'vue';
import { Pila } from '@/core/Pila';
import { Carta } from '@/core/Carta';
import { PALOS, VALORES, SIMBOLOS_PALO } from '@/types/cards';

/**
 * Baraja un array usando el algoritmo Fisher-Yates (Shuffle).
 * @param array El array a barajar.
 * @returns El array barajado.
 */
function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Intercambiar elementos
        const temp = array[currentIndex];
        const randomElement = array[randomIndex];
        if (temp !== undefined && randomElement !== undefined) {
            array[currentIndex] = randomElement;
            array[randomIndex] = temp;
        }
    }
    return array;
}

/**
 * Crea una baraja completa de 52 cartas.
 * @returns Un array de objetos Carta.
 */
function crearBaraja(): Carta[] {
    const baraja: Carta[] = [];
    for (const palo of PALOS) {
        for (const valor of VALORES) {
            // Se usa 'as' aquí porque las constantes ya están tipadas correctamente
            baraja.push(new Carta(palo, valor as Carta['publicValor'])); 
        }
    }
    return baraja;
}

// --- Composable Principal ---

export function useJuego() {
    // Estructuras de Pila. Se usan referencias reactivas para que los cambios en ellas
    // (como size() o peek()) se reflejen en la UI.
    const mazo = ref(new Pila<Carta>());
    const descarte = ref(new Pila<Carta>());
    
    // Mano del jugador (simplemente un array reactivo)
    const manoJugador: Ref<Carta[]> = ref([]);
    
    // Estado del juego
    const mensajeJuego = ref('');
    const juegoGanado = ref(false);

    /**
     * Inicializa el estado del juego: crea, baraja y reparte cartas.
     */
    function iniciarJuego() {
        // Reiniciar estados
        mazo.value = new Pila<Carta>();
        descarte.value = new Pila<Carta>();
        manoJugador.value = [];
        mensajeJuego.value = '¡El juego ha comenzado! Juega una carta o roba.';
        juegoGanado.value = false;

        // 1. Crear y barajar la baraja
        let baraja = crearBaraja();
        baraja = shuffle(baraja);

        // 2. Llenar la Pila mazo
        baraja.forEach(carta => mazo.value.push(carta));

        // 3. Repartir 7 cartas al jugador
        for (let i = 0; i < 7; i++) {
            const carta = mazo.value.pop();
            if (carta) {
                manoJugador.value.push(carta);
            }
        }

        // 4. Mover una carta de mazo a descarte para iniciar el juego
        const cartaInicial = mazo.value.pop();
        if (cartaInicial) {
            descarte.value.push(cartaInicial);
        } else {
            // Este caso no debería ocurrir con una baraja de 52 cartas
            console.error("El mazo está vacío después de repartir. Algo salió mal.");
        }
    }

    /**
     * Lógica especial para reconstituir el mazo cuando está vacío.
     */
    function reconstituirMazo() {
        console.warn("Mazo vacío. Reconstituyendo desde el descarte.");
        mensajeJuego.value = "Mazo reconstituido. ¡A seguir jugando!";
        
        // 1. La carta superior de descarte se mantiene (peek)
        const cartaSuperior = descarte.value.peek(); 
        
        if (!cartaSuperior) {
            // Esto solo pasaría si descarte estuviera vacío, lo cual es imposible si descarte tiene una carta inicial.
            console.error("No hay cartas en el descarte para reconstituir.");
            return;
        }

        // 2. El resto de las cartas de descarte se retiran (clear), menos la superior
        // Se usa pop() para remover la carta superior primero, y luego clear()
        descarte.value.pop(); // Sacamos la superior para procesar el resto
        let cartasParaMazo = descarte.value.clear(); 
        
        // 3. La carta superior se vuelve a colocar en descarte
        descarte.value.push(cartaSuperior); 

        // 4. Las cartas retiradas se barajan aleatoriamente y se usan para reconstruir el mazo.
        cartasParaMazo = shuffle(cartasParaMazo);
        cartasParaMazo.forEach(carta => mazo.value.push(carta)); 
    }

    /**
     * El jugador roba una carta del mazo.
     */
    function robarCarta() {
        if (mazo.value.isEmpty()) {
            // Si el mazo está vacío, lo reconstituimos antes de robar.
            if (descarte.value.size() <= 1) {
                // Caso extremo: descarte también casi vacío, no hay cartas para robar.
                mensajeJuego.value = "¡Juego terminado! No quedan cartas en el mazo ni en el descarte.";
                return;
            }
            reconstituirMazo();
        }

        const cartaRobada = mazo.value.pop();
        if (cartaRobada) {
            manoJugador.value.push(cartaRobada);
            mensajeJuego.value = `Has robado un ${cartaRobada.nombre}. Tu turno termina.`;
            
            // Lógica adicional: Comprobar si la carta robada es jugable y avisar al jugador
            const cartaSuperior = descarte.value.peek();
            if (cartaSuperior && cartaRobada.esJugableSobre(cartaSuperior)) {
                  mensajeJuego.value += ' ¡La carta robada es jugable, pero tu turno ha finalizado!';
            }
        }
    }

    /**
     * Intenta jugar una carta de la mano del jugador.
     * @param cartaAJuagar La carta que el jugador quiere jugar.
     * @returns True si la jugada fue válida, False en caso contrario.
     */
    function jugarCarta(cartaAJuagar: Carta): boolean {
        const cartaSuperior = descarte.value.peek();

        if (!cartaSuperior) {
             // Este caso solo ocurriría si el juego no estuviera iniciado.
            mensajeJuego.value = "El descarte está vacío. ¡Error de estado de juego!";
            return false;
        }

        if (cartaAJuagar.esJugableSobre(cartaSuperior)) {
            // Jugada VÁLIDA
            
            // 1. Quitar de la mano
            const index = manoJugador.value.findIndex(c => c.palo === cartaAJuagar.palo && c.publicValor === cartaAJuagar.publicValor);
            if (index !== -1) {
                manoJugador.value.splice(index, 1);
            }
            
            // 2. Añadir a la Pila de descarte
            descarte.value.push(cartaAJuagar);
            mensajeJuego.value = `¡Jugada válida! Has jugado un ${cartaAJuagar.nombre}.`;

            // 3. Comprobar condición de victoria
            if (manoJugador.value.length === 0) {
                juegoGanado.value = true;
                mensajeJuego.value = "¡FELICIDADES! ¡Te has quedado sin cartas y has ganado el juego!";
            }
            return true;
        } else {
            // Jugada INVÁLIDA
            mensajeJuego.value = `Movimiento no válido. El ${cartaAJuagar.nombre} no coincide con el ${cartaSuperior.nombre}.`;
            return false;
        }
    }

    // --- Estado Computado (Readonly para la UI) ---

    // La carta superior de la Pila descarte
    const cartaSuperiorDescarte = computed(() => descarte.value.peek());

    // El número de cartas restantes en el mazo
    const cartasRestantesMazo = computed(() => mazo.value.size());

    // Devuelve un array reactivo de las cartas de la mano del jugador
    const manoJugadorReadonly = readonly(manoJugador);
    
    // Comprobar si hay alguna carta jugable en la mano
    const hayJugadaValida = computed(() => {
        const cartaSuperior = cartaSuperiorDescarte.value;
        if (!cartaSuperior) return false;
        
        return manoJugador.value.some(carta => carta.esJugableSobre(cartaSuperior));
    });

    return {
        // Funciones
        iniciarJuego,
        robarCarta,
        jugarCarta,
        
        // Estado
        manoJugador: manoJugadorReadonly,
        cartaSuperiorDescarte,
        cartasRestantesMazo,
        mensajeJuego,
        juegoGanado,
        hayJugadaValida,
        
        // Utilidad para la UI
        SIMBOLOS_PALO,
        
        // Expuesto para testing (acceso interno)
        __test__: {
            mazo,
            descarte,
            manoJugador
        }
    };
}