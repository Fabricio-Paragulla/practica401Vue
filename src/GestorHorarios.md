# Componente GestorHorarios

Bienvenido a la documentación del componente `GestorHorarios.vue`. Este componente es una solución integral para la visualización y gestión de calendarios semanales en formato de cuadrícula dentro de tu aplicación Vue.js.

Si deseas integrar este componente, aquí encontrarás todo lo necesario sobre su propósito, estructura de datos y configuración inicial.

## Propósito

El componente ha sido diseñado para resolver la necesidad de administrar la ocupación de múltiples aulas de forma visual e intuitiva. Sus principales responsabilidades son:

- **Visualización**: Muestra una matriz de Días x Horas que permite identificar rápidamente los huecos libres y ocupados.
- **Gestión (CRUD)**: Facilita la creación, lectura, actualización y eliminación de reservas mediante un modal interactivo.
- **Navegación**: Permite cambiar dinámicamente entre diferentes aulas sin recargar la página, actualizando la vista al instante.

## Estructura de Datos

Para garantizar la integridad de la información y el correcto funcionamiento de la cuadrícula, el componente se basa en un tipado estricto. A continuación, se detallan las interfaces y tipos necesarios.

### 1. Interfaz IAsignatura

Esta interfaz define el objeto más básico: la información de la reserva en sí.

```typescript
export interface IAsignatura {
  nombre: string;   // Nombre de la materia (ej. "Matemáticas")
  profesor: string; // Nombre del docente (ej. "Dr. Pérez")
  grupo: string;    // Identificador del grupo (ej. "Grupo A")
  color?: string;   // (Opcional) Clase CSS para el fondo (ej. "bg-blue-100")
}
```

### 2. Tipo BloqueHorario

Define qué puede contener una celda específica de la cuadrícula.

- Si es un objeto `IAsignatura`, la celda está **Ocupada**.
- Si es `null`, la celda está **Libre** y se puede reservar.

```typescript
export type BloqueHorario = IAsignatura | null;
```

### 3. Tipo HorariosData (Estructura Principal)

Es el "mapa" completo de la aplicación. Es un objeto donde:

- **Clave**: Es el nombre del aula (String).
- **Valor**: Es la matriz bidimensional de horarios (`BloqueHorario[][]`).

```typescript
export type HorariosData = Record<string, BloqueHorario[][]>;
```

> **Nota**: La matriz bidimensional sigue el formato `[Día][Hora]`, donde el primer índice corresponde al día de la semana (0=Lunes) y el segundo a la franja horaria.

## Construcción de Datos Iniciales

Para inicializar el componente con datos precargados (por ejemplo, desde una API o un archivo JSON), debes construir un objeto que respete la estructura `HorariosData`.

Aquí tienes un ejemplo práctico de cómo debe lucir el objeto prop:

```javascript
const datosIniciales = {
  "Laboratorio de Física": [
    // Lunes (Índice 0)
    [
      null, // 08:00 - Libre
      {     // 09:00 - Ocupado
        nombre: "Física I",
        profesor: "Dra. Gómez",
        grupo: "Grupo A",
        color: "bg-green-100"
      },
      null, // 10:00 - Libre
      // ... resto de horas del lunes
    ],
    // Martes (Índice 1)
    [
      // ... array de bloques horarios del martes ...
    ],
    // ... Miércoles, Jueves, Viernes ...
  ],
  "Aula 101": [
    // ... matriz de horarios (puede estar vacía/nulls) ...
  ]
};
```

## Integración Rápida

Para usar el componente en tu vista principal, simplemente impórtalo y asegúrate de que el composable `useGestorHorarios` tenga acceso a los datos iniciales.

```vue
<script setup>
import GestorHorarios from '@/components/GestorHorarios.vue';
</script>

<template>
  <div class="mi-app">
    <GestorHorarios />
  </div>
</template>
```
