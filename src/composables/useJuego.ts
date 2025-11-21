import { ref, readonly } from 'vue';
import { Pila, Carta } from '@/core';
import { computed } from 'vue';

export function useJuego() {
  const mazo = ref(new Pila<Carta>());
  const descarte = ref(new Pila<Carta>());
  const manoJugador = ref<Carta[]>([]);

  function iniciarJuego() {
    // 1. Crear las 52 cartas
    // 2. Barajarlas (usando un array temporal)
    // 3. Llenar la Pila `mazo`
    // 4. Repartir 7 cartas a `manoJugador` (haciendo pop del mazo)
    // 5. Mover una carta de `mazo` a `descarte` (pop y push)
  }
  function robarCarta() {
    if (mazo.value.isEmpty()) {
      reconstituirMazo();
    }
    const carta = mazo.value.pop();
    if (carta) manoJugador.value.push(carta);
  }
  function jugarCarta(cartaAJuagar: Carta) {
    const cartaSuperior = descarte.value.peek();
    if (cartaSuperior && cartaAJuagar.esJugableSobre(cartaSuperior)) {
      // Quitar de la mano y añadir al descarte
      manoJugador.value = manoJugador.value.filter(c => c !== cartaAJuagar);
      descarte.value.push(cartaAJuagar);
    } else {
      console.error("Movimiento no válido");
    }
  }
  function reconstituirMazo() {
    // Lógica para barajar el descarte y rellenar el mazo
  }
  return {
    iniciarJuego,
    robarCarta,
    jugarCarta,
    manoJugador: readonly(manoJugador),
    cartaSuperiorDescarte: computed(() => descarte.value.peek()),
    // ... más estado reactivo
  };
}

