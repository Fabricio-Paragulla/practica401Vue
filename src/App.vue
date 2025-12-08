<script setup lang="ts">
import JuegoCartas from '../src/components/JuegoCartas.vue';
import SalaCine from '../src/components/SalaCine.vue';
import GestorHorarios from '../src/components/GestorHorarios.vue';
import PanelDeControl from '../src/components/PanelDeControl.vue';
import ContenidoPrincipal from '../src/components/ContenidoPrincipal.vue';
import NotificationComposer from './components/NotificationComposer.vue';
import { ref } from 'vue';
const vistaActual = ref<'cartas' | 'cine' | 'horarios'>('cine');
// Estado para controlar qué ejercicio se ve
const currentTab = ref<'ej1' | 'ej2'>('ej1');
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
    <div class="main-wrapper">

        <nav class="top-nav">
        <button
            :class="{ active: currentTab === 'ej1' }"
            @click="currentTab = 'ej1'"
        >
            Ejercicio 4.1: Singleton
        </button>
        <button
            :class="{ active: currentTab === 'ej2' }"
            @click="currentTab = 'ej2'"
        >
            Ejercicio 4.2: Factory
        </button>
        </nav>

        <div v-if="currentTab === 'ej1'" class="exercise-container">
        <header class="exercise-header">
            <h1>Configuración Global (Singleton)</h1>
            <p>Cambia el tema o el idioma y verás cómo afecta a toda la app.</p>
        </header>

        <div class="singleton-layout">
            <aside class="sidebar"><PanelDeControl /></aside>
            <main class="content"><ContenidoPrincipal /></main>
        </div>
        </div>

        <div v-if="currentTab === 'ej2'" class="exercise-container">
        <header class="exercise-header">
            <h1>Sistema de Notificaciones (Factory)</h1>
            <p>Selecciona un tipo y envía. La factoría creará el objeto correcto.</p>
        </header>

        <NotificationComposer />
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

/* Estilos generales para el layout de la práctica */
body { 
    margin: 0; 
    font-family: 'Inter', sans-serif; 
    background-color: #f0f2f5; 
    color: #333; 
}

.main-wrapper { 
    max-width: 1200px; 
    margin: 0 auto; 
    padding: 20px; 
}

/* Navegación tipo pestañas */
.top-nav {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 10px;
}
.top-nav button {
    padding: 10px 20px; 
    border: none; 
    background: transparent;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    color: #666;
    border-radius: 6px;
}
.top-nav button:hover { 
    background: #e0e0e0; 
}
.top-nav button.active { 
    background: #0066ff;
    color: white; 
}

/* Layout específico del Singleton (Eje 1) */
.singleton-layout {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 40px;
    align-items: start;
}

/* Header de cada ejercicio */
.exercise-header { 
    margin-bottom: 20px; 
}
.exercise-header h1 { 
    margin: 0;
    font-size: 1.5rem; 
}
.exercise-header p {
    margin: 5px 0 0 0;
    color: #666; 
}

</style>