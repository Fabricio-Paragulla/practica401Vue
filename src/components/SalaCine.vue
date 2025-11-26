<script setup lang="ts">
import { useSalaCine } from '../composables/useSalaCine';
import { EstadoButaca } from '../types/cinema';

// Usamos el composable para la lógica y el estado de la sala
const {
    sala,
    toggleButaca,
    confirmarReserva,
    resumenSeleccion,
    totalPagar,
    mensajeSistema,
    PRECIO_BUTACA,
} = useSalaCine();

// Función auxiliar para obtener el color CSS basado en el estado
const getColorClase = (estado: EstadoButaca): string => {
    switch (estado) {
        case EstadoButaca.DISPONIBLE: return 'butaca-disponible';
        case EstadoButaca.SELECCIONADO: return 'butaca-seleccionado';
        case EstadoButaca.OCUPADO: return 'butaca-ocupado';
        case EstadoButaca.DANADO: return 'butaca-danado';
        default: return 'butaca-danado';
    }
};

// Función auxiliar para saber si la butaca es clickable
const isClickable = (estado: EstadoButaca): boolean => {
    return estado === EstadoButaca.DISPONIBLE || estado === EstadoButaca.SELECCIONADO;
};
</script>

<template>
<div class="sala-container">
    <div class="sala-cine-content">
        
        <!-- Sección de Información de Película (Header) -->
        <div class="header-pelicula">
            <h2 class="titulo-pelicula">El Origen</h2>
            <p class="detalle-sesion">Hoy, 20:30, Sala 8</p>
        </div>

        <!-- Área Central de la Sala -->
        <div class="mapa-resumen-wrapper">
            
            <!-- Mapa de Butacas -->
            <div class="mapa-butacas">
                <div class="pantalla-cinta">PANTALLA</div>

                <!-- Índices de Columna (1, 2, 3...) -->
                <div class="indice-columnas">
                    <span class="indice-placeholder"></span>
                    <span v-for="c in (sala[0]?.length || 0)" :key="c" class="indice-columna">{{ c }}</span>
                    <span class="indice-placeholder"></span>
                </div>
                
                <!-- Cuadrícula de Butacas -->
                <div class="cuadricula">
                    <div v-for="(fila, fIndex) in sala" :key="fIndex" class="fila-butacas">
                        
                        <!-- Índice de Fila (A, B, C...) -->
                        <span class="indice-fila">{{ String.fromCharCode(65 + fIndex) }}</span>
                        
                        <!-- Butacas de la Fila -->
                        <div v-for="butaca in fila" :key="butaca.id" class="butaca-wrapper">
                            <button
                                :class="['butaca', getColorClase(butaca.estado)]"
                                :disabled="!isClickable(butaca.estado)"
                                @click="toggleButaca(butaca)"
                                :aria-label="'Butaca ' + butaca.id + ': ' + butaca.estado"
                            >
                                <span class="butaca-id">{{ butaca.id.slice(1) }}</span>
                                <!-- Icono para Butacas Ocupadas o Dañadas -->
                                <svg v-if="butaca.estado === EstadoButaca.OCUPADO" class="butaca-icono" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                                <svg v-else-if="butaca.estado === EstadoButaca.DANADO" class="butaca-icono" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                            </button>
                        </div>

                        <!-- Índice de Fila (Derecha) -->
                        <span class="indice-fila">{{ String.fromCharCode(65 + fIndex) }}</span>
                    </div>
                </div>

            </div>

            <!-- Panel de Resumen y Leyenda -->
            <div class="panel-resumen">
                <div class="resumen-box">
                    <h3 class="resumen-titulo">Tu Selección</h3>
                    
                    <p class="resumen-detalle butacas-lista">
                        Butacas: {{ resumenSeleccion }}
                    </p>
                    
                    <p class="resumen-detalle total-pago">
                        Total: {{ totalPagar.toFixed(2) }} €
                        <span class="precio-unidad">(Precio por butaca: {{ PRECIO_BUTACA.toFixed(2) }} €)</span>
                    </p>

                    <button 
                        @click="confirmarReserva"
                        :disabled="totalPagar === 0"
                        class="btn-confirmar"
                    >
                        Confirmar Reserva
                    </button>

                    <p v-if="mensajeSistema" class="mensaje-sistema">{{ mensajeSistema }}</p>
                </div>
                
                <!-- Leyenda de Estados -->
                <div class="leyenda">
                    <h4 class="leyenda-titulo">Leyenda</h4>
                    <div class="leyenda-item"><span class="simbolo butaca-disponible"></span> Disponible</div>
                    <div class="leyenda-item"><span class="simbolo butaca-seleccionado"></span> Seleccionada</div>
                    <div class="leyenda-item"><span class="simbolo butaca-ocupado"><svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/></svg></span> Ocupada</div>
                    <div class="leyenda-item"><span class="simbolo butaca-danado"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg></span> No disponible/Dañada</div>
                </div>
            </div>
            
        </div>
    </div>
</div>
</template>

<style scoped>
/* Colores y Variables */
:root {
    --color-bg-dark: #1a1a2e;
    --color-primary: #8e44ad; /* Morado base */
    --color-accent: #f39c12; /* Naranja/Amarillo */
    --color-text-light: #e0e0e0;
    --color-disponible: #4a4a58;
    --color-seleccionado: #9b59b6; /* Morado brillante */
    --color-ocupado: #34495e;
    --color-danado: #2c3e50;
}

.sala-container {
    background-color: var(--color-bg-dark);
    color: var(--color-text-light);
    min-height: calc(100vh - 80px); /* Ajuste basado en el nav de App.vue */
    padding: 2rem;
    font-family: 'Inter', sans-serif;
}

.sala-cine-content {
    max-width: 1200px;
    margin: 0 auto;
}

/* --- HEADER --- */
.header-pelicula {
    text-align: left;
    margin-bottom: 2rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #4a4a58;
}

.titulo-pelicula {
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
}

.detalle-sesion {
    font-size: 1.1rem;
    color: #bdc3c7;
}

/* --- MAPA Y RESUMEN --- */
.mapa-resumen-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

@media (min-width: 1024px) {
    .mapa-resumen-wrapper {
        flex-direction: row;
        justify-content: space-between;
    }
}

/* --- MAPA DE BUTACAS --- */
.mapa-butacas {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background-color: #272740; /* Fondo ligeramente diferente para el mapa */
    border-radius: 12px;
}

.pantalla-cinta {
    width: 80%;
    margin-bottom: 2rem;
    padding: 0.5rem 0;
    text-align: center;
    background: linear-gradient(to right, #9b59b6 0%, #3498db 100%);
    color: white;
    font-weight: bold;
    border-radius: 4px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    transform: perspective(100px) rotateX(-5deg); /* Efecto 3D de inclinación */
}

/* Índices (Números y Letras) */
.indice-columnas {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: fit-content;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    color: #95a5a6;
}
.indice-placeholder { width: 1.5rem; }
.indice-columna { width: 1.5rem; text-align: center; }

/* Cuadrícula */
.cuadricula {
    display: flex;
    flex-direction: column;
    gap: 0.5rem; /* Espacio entre filas */
    padding: 1rem;
    border: 1px solid #34495e;
    border-radius: 8px;
    background-color: #1c1c30;
}

.fila-butacas {
    display: flex;
    gap: 0.25rem; /* Espacio entre butacas */
    align-items: center;
}

.indice-fila {
    width: 1.5rem;
    text-align: center;
    font-weight: bold;
    color: #95a5a6;
    font-size: 0.9rem;
}

/* --- BUTACAS --- */
.butaca-wrapper {
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    margin: 0 1px;
}

.butaca {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 4px 4px 0 0;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.1s;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    box-sizing: border-box;
    position: relative;
}

.butaca:disabled {
    cursor: not-allowed;
    opacity: 0.8;
}

.butaca-id {
    font-size: 0.6rem;
    font-weight: bold;
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.butaca-icono {
    width: 60%;
    height: 60%;
    color: white;
    opacity: 0.5;
}

/* Clases de Estado */
.butaca-disponible {
    background-color: var(--color-disponible);
}
.butaca-disponible:hover {
    background-color: #5d5d6b;
}

.butaca-seleccionado {
    background-color: var(--color-seleccionado);
    border: 2px solid var(--color-accent);
}

.butaca-ocupado {
    background-color: var(--color-ocupado);
    cursor: not-allowed;
}

.butaca-danado {
    background-color: var(--color-danado);
    cursor: not-allowed;
}

/* --- PANEL DE RESUMEN --- */
.panel-resumen {
    width: 100%;
    max-width: 350px;
}

.resumen-box {
    background-color: #272740;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    margin-bottom: 2rem;
}

.resumen-titulo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-accent);
    margin-bottom: 1rem;
    border-bottom: 1px solid #34495e;
    padding-bottom: 0.5rem;
}

.resumen-detalle {
    margin-bottom: 0.75rem;
    font-size: 1rem;
    font-weight: 500;
}

.butacas-lista {
    word-wrap: break-word;
    max-height: 100px;
    overflow-y: auto;
    color: #bdc3c7;
}

.total-pago {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
}

.precio-unidad {
    display: block;
    font-size: 0.8rem;
    font-weight: normal;
    color: #95a5a6;
}

.btn-confirmar {
    width: 100%;
    padding: 0.75rem;
    background-color: var(--color-seleccionado);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 1rem;
}

.btn-confirmar:hover:not(:disabled) {
    background-color: #6c3483;
}

.btn-confirmar:disabled {
    background-color: #5d6d7e;
    cursor: not-allowed;
    opacity: 0.7;
}

.mensaje-sistema {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #f39c12;
}

/* --- LEYENDA --- */
.leyenda-titulo {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #e0e0e0;
}

.leyenda-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #bdc3c7;
}

.simbolo {
    width: 15px;
    height: 15px;
    border-radius: 3px;
    margin-right: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.simbolo svg {
    fill: white;
    width: 10px;
    height: 10px;
}
/* Mapeo de colores de leyenda */
.simbolo.butaca-disponible { background-color: var(--color-disponible); }
.simbolo.butaca-seleccionado { background-color: var(--color-seleccionado); }
.simbolo.butaca-ocupado { background-color: var(--color-ocupado); }
.simbolo.butaca-danado { background-color: var(--color-danado); }
</style>