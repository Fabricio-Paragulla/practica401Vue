<script setup lang="ts">
import { onMounted } from 'vue';
import { useJuego } from '../composables/useJuego'; 
import type { Carta } from '../core/Carta';

// Usamos el composable para acceder a toda la lógica y el estado reactivo
const { 
    iniciarJuego, 
    robarCarta, 
    jugarCarta, 
    manoJugador, 
    cartaSuperiorDescarte, 
    cartasRestantesMazo, 
    mensajeJuego, 
    juegoGanado,
    hayJugadaValida,
    SIMBOLOS_PALO 
} = useJuego();

// Lógica de interacción del jugador
const handleClickCarta = (carta: Carta) => {
    // Si el juego ya ha terminado, no hacemos nada
    if (juegoGanado.value) return;
    jugarCarta(carta);
};

const handleClickRobar = () => {
    // Si el juego ya ha terminado, no hacemos nada
    if (juegoGanado.value) return;
    robarCarta();
};

// Se inicia el juego automáticamente al montar el componente
onMounted(() => {
    iniciarJuego();
});

// Función para obtener las clases y datos de una carta
const getCartaData = (carta: Carta | undefined) => {
    if (!carta) {
        return {
            isEmpty: true,
            colorClase: '',
            simbolo: '',
            valor: ''
        };
    }
    
    const esRoja = carta.palo === 'Corazones' || carta.palo === 'Diamantes';
    const colorClase = esRoja ? 'card-red' : 'card-black';
    const simbolo = SIMBOLOS_PALO[carta.palo];
    
    return {
        isEmpty: false,
        colorClase,
        simbolo,
        valor: carta.publicValor
    };
};

</script>

<template>
<div class="juego-container">
    
    <!-- Título y Mensaje de Estado -->
    <header class="header-section">
        <h1 class="titulo">Juego de Cartas: El Último Descarte</h1>
        <p :class="['mensaje-estado', { 'mensaje-ganado': juegoGanado, 'mensaje-jugable': hayJugadaValida }]">
            {{ mensajeJuego }}
        </p>
        <button v-if="juegoGanado" @click="iniciarJuego" class="btn-reiniciar">
            Jugar de Nuevo
        </button>
    </header>

    <!-- Área de Juego Superior (Mazo y Descarte) -->
    <div class="area-juego">
        
        <!-- Mazo de Robo -->
        <div class="zona-mazo">
            <h3 class="subtitulo">Mazo de Robo</h3>
            
            <div class="card-wrapper">
                <!-- Carta Superior del Mazo (Dorso) -->
                <div v-if="cartasRestantesMazo > 0" class="mazo-dorso" @click="handleClickRobar">
                    <!-- Icono simple de carta -->
                    <svg class="mazo-icono" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2h10c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm0 2v3h10V4H7zm0 16h10v-3H7v3zm0-13h10v6H7v-6z"/></svg>
                </div>
                <!-- Placeholder de Mazo Vacío -->
                <div v-else class="mazo-vacio">
                    <span class="mazo-vacio-texto">Mazo vacío. ¡Robar reconstituirá!</span>
                </div>
            </div>
            <!-- Botón de Robar Carta -->
            <button @click="handleClickRobar" :disabled="juegoGanado" class="btn-robar-carta">
                Robar Carta
            </button>
            <p class="contador-cartas">Cartas restantes: {{ cartasRestantesMazo }}</p>
        </div>

        <!-- Pila de Descarte -->
        <div class="zona-descarte">
            <h3 class="subtitulo">Pila de Descarte</h3>
            <div class="card-wrapper">
                <!-- Carta Superior del Descarte -->
                <div v-if="cartaSuperiorDescarte" :class="['card', getCartaData(cartaSuperiorDescarte).colorClase]">
                    <!-- Valor y Símbolo Superior -->
                    <div class="card-corner top-left">
                        <span class="card-value">{{ getCartaData(cartaSuperiorDescarte).valor }}</span>
                        <span class="card-suit-small">{{ getCartaData(cartaSuperiorDescarte).simbolo }}</span>
                    </div>
                    
                    <!-- Símbolo Central Grande -->
                    <div class="card-center">
                        {{ getCartaData(cartaSuperiorDescarte).simbolo }}
                    </div>
                    
                    <!-- Valor y Símbolo Inferior Invertido -->
                    <div class="card-corner bottom-right">
                        <span class="card-value">{{ getCartaData(cartaSuperiorDescarte).valor }}</span>
                        <span class="card-suit-small">{{ getCartaData(cartaSuperiorDescarte).simbolo }}</span>
                    </div>
                </div>
                <div v-else class="card-placeholder">Mazo Vacío</div>
            </div>
            <p class="contador-cartas">Carta Superior</p>
        </div>
        
    </div>
    
    <!-- Mano del Jugador -->
    <section class="mano-jugador-section">
        <h2 class="mano-titulo">Tu Mano ({{ manoJugador.length }} Cartas)</h2>
        
        <div v-if="manoJugador.length > 0" class="mano-cartas">
            <div 
                v-for="(carta, index) in manoJugador" 
                :key="index" 
                class="card-item-interactivo"
                @click="handleClickCarta(carta)"
            >
                <!-- Carta de la mano del jugador -->
                <div :class="['card', 'card-clickable', getCartaData(carta).colorClase]">
                    <!-- Valor y Símbolo Superior -->
                    <div class="card-corner top-left">
                        <span class="card-value">{{ getCartaData(carta).valor }}</span>
                        <span class="card-suit-small">{{ getCartaData(carta).simbolo }}</span>
                    </div>
                    
                    <!-- Símbolo Central Grande -->
                    <div class="card-center">
                        {{ getCartaData(carta).simbolo }}
                    </div>
                    
                    <!-- Valor y Símbolo Inferior Invertido -->
                    <div class="card-corner bottom-right">
                        <span class="card-value">{{ getCartaData(carta).valor }}</span>
                        <span class="card-suit-small">{{ getCartaData(carta).simbolo }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="!juegoGanado" class="mano-vacia">
            ¡Tienes una jugada pendiente o acabas de ganar!
        </div>
    </section>
    
    <!-- Modal de Victoria -->
    <div v-if="juegoGanado" class="modal-overlay">
        <div class="modal-content">
            <h2 class="modal-titulo">¡Juego Ganado!</h2>
            <p class="modal-texto">Te has deshecho de todas tus cartas. ¡Bien hecho!</p>
            <button @click="iniciarJuego" class="btn-reiniciar-modal">
                Reiniciar Partida
            </button>
        </div>
    </div>
</div>
</template>

<style scoped>
/* FIX: Estilo base para el contenedor principal para centrar contenido */
.juego-container {
    min-height: 100vh;
    background-color: #f7f7f7; /* Fondo más claro para simular un lienzo */
    color: #333;
    padding: 1.5rem;
    font-family: 'Inter', Arial, sans-serif;
    text-align: center;
}

/* FIX: Estilo del botón Robar Carta */
.btn-robar-carta {
    margin-top: 1rem;
    background-color: #4f46e5; /* Color primario */
    color: white;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s, opacity 0.3s;
    width: 100%; /* Ocupa el ancho de la zona mazo */
    max-width: 150px;
}

.btn-robar-carta:hover {
    background-color: #4338ca;
}

.btn-robar-carta:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: #6366f1;
}

/* --- TÍTULO Y MENSAJE DE ESTADO --- */
.titulo {
    font-size: 2rem;
    font-weight: 800;
    color: #10b981; /* green-600 */
}

.mensaje-estado {
    margin-top: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    min-height: 1.5rem;
    padding: 0.5rem 1rem;
    background-color: #e6ffe6; /* Fondo suave para el mensaje */
    border-left: 5px solid #10b981;
    display: inline-block;
    border-radius: 4px;
}

.mensaje-ganado {
    color: #4ade80;
    background-color: #059669;
    padding: 10px 20px;
    border-radius: 8px;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* --- ÁREA DE JUEGO (MAZO Y DESCARTE) --- */

.area-juego {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    margin-bottom: 3rem;
}

@media (min-width: 768px) {
    .area-juego {
        flex-direction: row;
    }
}

.zona-mazo, .zona-descarte {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 10rem;
    height: 14rem;
}

.subtitulo {
    font-size: 1.125rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 0.5rem;
}

.card-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
}

.contador-cartas {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #666;
}

/* --- MAZO DE ROBO (DORSO) --- */

.mazo-dorso {
    position: absolute;
    inset: 0;
    background-color: #4f46e5;
    border: 4px solid #fff;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mazo-dorso:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
}

.mazo-icono {
    width: 50%;
    height: 50%;
    color: white;
    opacity: 0.8;
}

/* --- DISEÑO DE CARTA (FRONTAL) --- */

.card {
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    padding: 0.75rem;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    user-select: none;
    font-weight: bold;
}

.card-red { 
    color: #dc2626; /* Rojo para Corazones y Diamantes */
}

.card-black {
    color: #111;
}

.card-corner {
    display: flex;
    flex-direction: column;
    line-height: 1;
}

.top-left {
    align-items: flex-start;
}

.bottom-right {
    align-items: flex-end;
    transform: rotate(180deg);
}

.card-value {
    font-size: 0.875rem;
}

.card-suit-small {
    font-size: 1.25rem;
}

.card-center {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.5rem;
    opacity: 0.7;
}

/* --- MANO DEL JUGADOR --- */

.mano-jugador-section {
    text-align: center;
}

.mano-titulo {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #4f46e5;
}

.mano-cartas {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.card-item-interactivo {
    width: 8rem;
    height: 11rem;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
}

.card-item-interactivo:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
}

.card-item-interactivo:hover .card {
    border: 2px solid #4f46e5;
}

/* --- MODAL DE VICTORIA --- */

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    z-index: 50;
}

.modal-content {
    background-color: #1f2937;
    padding: 2rem;
    border-radius: 0.75rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    text-align: center;
    border: 4px solid #34d399;
    max-width: 90%;
}

.modal-titulo {
    font-size: 2.5rem;
    font-weight: 800;
    color: #4ade80;
    margin-bottom: 1rem;
}

.modal-texto {
    font-size: 1.25rem;
    color: white;
    margin-bottom: 1.5rem;
}

.btn-reiniciar-modal {
    background-color: #4f46e5;
    color: white;
    font-weight: bold;
    padding: 0.75rem 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-reiniciar-modal:hover {
    background-color: #4338ca;
}
</style>