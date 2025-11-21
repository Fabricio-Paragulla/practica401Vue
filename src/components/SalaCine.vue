<script setup lang="ts">
    import { ref, computed } from 'vue';
    import type { IButaca } from '@/types/cinema';
    import { EstadoButaca } from '@/types/cinema';
// --- Props (para configurar la sala desde fuera) ---
    const props = defineProps({
        filas: { type: Number, required: true },
        columnas: { type: Number, required: true },
        precioPorButaca: { type: Number, default: 8 },
    });
// --- Funciones ---
function inicializarSala(): IButaca[][] {
    const salaMatrix: IButaca[][] = [];
    for (let fila = 0; fila < props.filas; fila++) {
        const filaButacas: IButaca[] = [];
        for (let columna = 0; columna < props.columnas; columna++) {
            filaButacas.push({
                id: `${fila}-${columna}`,
                fila,
                columna,
                estado: EstadoButaca.DISPONIBLE
            });
        }
        salaMatrix.push(filaButacas);
    }
    return salaMatrix;
}

// --- Estado Reactivo ---
const sala = ref<IButaca[][]>(inicializarSala());
//...
</script>