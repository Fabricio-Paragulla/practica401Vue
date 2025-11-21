<script setup lang="ts">
import { useJuego } from '@/composables/useJuego';
import { onMounted } from 'vue';

const {
    iniciarJuego,
    robarCarta,
    jugarCarta,
    manoJugador,
    cartaSuperiorDescarte,
} = useJuego();
    onMounted(iniciarJuego);
</script>

<template>
    <div class="tablero">
    <!-- Zona de Mazo y Descarte -->
        <div class="pilas">
            <div class="mazo" @click="robarCarta">
    <!-- Mostrar reverso de carta y contador -->
        </div>

        <div class="descarte">
    <!-- Mostrar la carta `cartaSuperiorDescarte` -->
        </div>
    </div>
    <!-- Zona de la Mano del Jugador -->
    <div class="mano">
            <div v-for="carta in manoJugador" :key="carta.nombre" @click="jugarCarta(carta)"> {{ carta.nombre }} </div>
        </div>
    </div>
</template>
