<script setup lang="ts">
import JuegoCartas from '../src/components/JuegoCartas.vue';
import SalaCine from '../src/components/SalaCine.vue';
import GestorHorarios from '../src/components/GestorHorarios.vue';
import { ref } from 'vue';
const vistaActual = ref<'cartas' | 'cine' | 'horarios'>('cine');
</script>

<template>
  <div id="app">
    
    <header class="nav-bar">
        <h1 class="logo">UD4 Ejercicios</h1>
        <div class="botones-cambio">
            <button 
                @click="vistaActual = 'cartas'" 
                :class="{ 'active': vistaActual === 'cartas' }"
                class="nav-btn"
            >
                Juego de Cartas (Pila)
            </button>
            <button 
                @click="vistaActual = 'cine'" 
                :class="{ 'active': vistaActual === 'cine' }"
                class="nav-btn"
            >
                Sala de Cine (Matriz)
            </button>
            <button 
              @click="vistaActual = 'horarios'" 
              :class="{ 'active' : vistaActual === 'horarios' }" 
              class="nav-btn">
              Gestor de Horarios (Aulas)
            </button>
        </div>
    </header>

    <main class="content-area">
        <JuegoCartas v-if="vistaActual === 'cartas'" />
        <SalaCine v-else-if="vistaActual === 'cine'" />
        <GestorHorarios v-else-if="vistaActual === 'horarios'" />
    </main>
    <div class="aviso-consola">
        Revisa la consola (F12) para ver el log de eventos del juego de cartas o la sala de cine.
    </div>
  </div>
</template>

<style>
/* Estilos globales para la aplicación */
#app {
  font-family: 'Inter', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  margin: 0;
  background-color: #1a1a2e; /* Fondo oscuro de la sala de cine */
}
body { margin: 0; }

.nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #272343; /* Un morado oscuro */
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
    color: #ffd803; /* Amarillo brillante */
}

.botones-cambio {
    display: flex;
    gap: 0.5rem;
}

.nav-btn {
    background-color: transparent;
    color: #e0e0e0;
    border: 1px solid #4f46e5;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
}

.nav-btn:hover {
    background-color: #4f46e5;
    color: white;
}

.nav-btn.active {
    background-color: #4f46e5;
    border-color: #4f46e5;
    color: white;
}

.content-area {
    padding: 2rem 1rem;
    min-height: calc(100vh - 100px); /* Ajuste de altura */
}

.aviso-consola {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 0.5rem;
    font-size: 0.75rem;
    color: #ccc;
    background-color: #333;
    width: 100%;
    text-align: center;
    z-index: 1000;
}
</style>