<script setup lang="ts">
import { useGestorHorarios } from '../composables/useGestorHorarios';

const {
    aulasDisponibles,
    aulaSeleccionada,
    horarioVisible, // No se usa, pero es necesario de todas formas
    DIAS_SEMANA,
    HORAS_CLASE,
    modalAbierto,
    formulario,
    abrirModal,
    cerrarModal,
    guardarReserva,
    eliminarReserva,
    getReserva
} = useGestorHorarios();

const mostrarMensaje = () => {
    window.alert('Selecciona una celda vacía para crear');
};

</script>

<template>
<div class="gestor-container">
    <div class="gestor-header">
        <div class="header-info">
            <h2>Gestor de Aulas</h2>
            <div class="controles">
                <button class="btn-nav">&lt;</button>
                <span class="fecha-actual">18 - 24 Nov, 2024</span>
                <button class="btn-nav">&gt;</button>
            </div>
        </div>
        
        <div class="selector-aula">
            <label>Aula:</label>
            <select v-model="aulaSeleccionada" class="select-input">
                <option v-for="aula in aulasDisponibles" :key="aula" :value="aula">
                    {{ aula }}
                </option>
            </select>
            <button class="btn-nueva" @click="mostrarMensaje">+ Nueva Reserva</button>
        </div>
    </div>
    <div class="tabla-wrapper">
        <table class="horario-table">
            <thead>
                <tr>
                    <th class="hora-col">Hora</th>
                    <th v-for="dia in DIAS_SEMANA" :key="dia">{{ dia }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(hora, hIndex) in HORAS_CLASE" :key="hora">
                    <td class="hora-celda">{{ hora }}</td>
                    <td 
                        v-for="(dia, dIndex) in DIAS_SEMANA" 
                        :key="dia"
                        class="celda-interactiva"
                        @click="abrirModal(dIndex, hIndex)"
                    >
                        <!-- Contenido de la celda -->
                        <div v-if="getReserva(dIndex, hIndex)" 
                            class="reserva-card"
                            :class="getReserva(dIndex, hIndex)?.color || 'bg-gray-100'"
                        >
                            <span class="asignatura">{{ getReserva(dIndex, hIndex)?.nombre }}</span>
                            <span class="profesor">{{ getReserva(dIndex, hIndex)?.profesor }}</span>
                            <span class="grupo">{{ getReserva(dIndex, hIndex)?.grupo }}</span>
                        </div>
                        <div v-else class="celda-vacia">
                            <span class="plus-hover">+</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div v-if="modalAbierto" class="modal-overlay" @click.self="cerrarModal">
        <div class="modal-content">
            <h3 class="modal-titulo">Editar Reserva</h3>
            <p class="modal-subtitulo">Detalles de la sesión</p>
            
            <form @submit.prevent="guardarReserva" class="modal-form">
                <div class="form-group">
                    <label>Asignatura</label>
                    <select v-model="formulario.nombre" required>
                        <option value="" disabled>Selecciona...</option>
                        <option value="Cálculo I">Cálculo I</option>
                        <option value="Álgebra Lineal">Álgebra Lineal</option>
                        <option value="Programación">Programación</option>
                        <option value="Física">Física</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Profesor</label>
                    <select v-model="formulario.profesor" required>
                        <option value="" disabled>Selecciona...</option>
                        <option value="Dr. Pérez">Dr. Pérez</option>
                        <option value="Dra. Gómez">Dra. Gómez</option>
                        <option value="Dra. Sánchez">Dra. Sánchez</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Grupo/Curso</label>
                    <select v-model="formulario.grupo" required>
                        <option value="" disabled>Selecciona...</option>
                        <option value="Grupo A">Grupo A</option>
                        <option value="Grupo B">Grupo B</option>
                        <option value="Grupo C">Grupo C</option>
                        <option value="Grupo D">Grupo D</option>
                    </select>
                </div>

                <div class="modal-actions">
                    <button type="button" @click="eliminarReserva" class="btn-eliminar">Eliminar Reserva</button>
                    <div class="right-actions">
                        <button type="button" @click="cerrarModal" class="btn-cancelar">Cancelar</button>
                        <button type="submit" class="btn-guardar">Guardar Reserva</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<style scoped>
.gestor-container {
    background-color: #f3f4f6; /* Fondo claro interior como en la imagen */
    border-radius: 8px;
    padding: 1.5rem;
    color: #1f2937;
    min-height: 600px;
}

/* Header */
.gestor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.header-info h2 { margin: 0 0 0.5rem 0; font-size: 1.5rem; }
.controles { display: flex; align-items: center; gap: 1rem; color: #4b5563; }
.btn-nav { background: none; border: none; font-size: 1.2rem; cursor: pointer; }

.selector-aula { display: flex; align-items: center; gap: 1rem; }
.select-input { padding: 0.5rem; border-radius: 6px; border: 1px solid #d1d5db; }
.btn-nueva { background-color: #2563eb; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; }

/* Tabla */
.tabla-wrapper { overflow-x: auto; }
.horario-table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }

th { background-color: #f9fafb; padding: 1rem; text-align: left; font-weight: 600; border-bottom: 1px solid #e5e7eb; }
td { border: 1px solid #e5e7eb; height: 100px; vertical-align: top; width: 18%; }
.hora-col { width: 10%; text-align: center; }
.hora-celda { text-align: center; font-weight: bold; color: #6b7280; padding-top: 1rem; }

/* Celdas */
.celda-interactiva { cursor: pointer; transition: background 0.2s; position: relative; }
.celda-interactiva:hover { background-color: #f0f9ff; }

.reserva-card {
    margin: 4px;
    padding: 8px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 0.85rem;
    border-left: 4px solid rgba(0,0,0,0.1);
}
/* Clases de utilidad para colores (simuladas en CSS puro si no usas Tailwind) */
.bg-blue-100 { background-color: #dbeafe; color: #1e40af; }
.bg-green-100 { background-color: #dcfce7; color: #166534; }
.bg-yellow-100 { background-color: #fef9c3; color: #854d0e; }
.bg-purple-100 { background-color: #f3e8ff; color: #6b21a8; }
.bg-gray-100 { background-color: #f3f4f6; color: #1f2937; }

.asignatura { font-weight: bold; font-size: 0.9rem; }
.celda-vacia { height: 100%; display: flex; align-items: center; justify-content: center; opacity: 0; }
.celda-interactiva:hover .celda-vacia { opacity: 0.5; color: #2563eb; font-weight: bold; }

/* Modal */
.modal-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex; justify-content: center; align-items: center;
    z-index: 50;
}
.modal-content {
    background: white; padding: 2rem; border-radius: 8px; width: 90%; max-width: 500px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.modal-titulo { margin-top: 0; }
.modal-subtitulo { color: #6b7280; margin-bottom: 1.5rem; font-size: 0.9rem; }

.form-group { margin-bottom: 1rem; }
.form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.9rem; }
.form-group select { width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 6px; background: #f9fafb; }

.modal-actions { display: flex; justify-content: space-between; margin-top: 2rem; }
.right-actions { display: flex; gap: 0.5rem; }

.btn-eliminar { background: transparent; color: #ef4444; border: none; font-weight: bold; cursor: pointer; }
.btn-cancelar { background: transparent; border: none; cursor: pointer; font-weight: 500; color: #374151; }
.btn-guardar { background: #3b82f6; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; font-weight: bold; cursor: pointer; }
.btn-guardar:hover { background: #2563eb; }
</style>