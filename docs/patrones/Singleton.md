# Patrón Singleton: AppConfig

## 1. Propósito
Hemos elegido el **Patrón Singleton** para la clase `AppConfig` con el objetivo de garantizar una **única fuente de la verdad** para la configuración de la aplicación.

En una aplicación Vue compleja, tener múltiples copias de la configuración podría llevar a inconsistencias (ej. una parte de la web en modo oscuro y otra en claro). El Singleton asegura que:
1.  Solo exista **una instancia** de la configuración en memoria.
2.  El estado sea **reactivo y global**: si cambia en un lugar, se actualiza en todas partes.
3.  La persistencia en `localStorage` esté centralizada en un único punto de acceso.

## 2. API Pública
La clase `AppConfig` no se puede instanciar con `new`. Se debe utilizar su API estática y sus métodos públicos.

| Método | Firma | Descripción |
| :--- | :--- | :--- |
| **getInstance** | `static getInstance(): AppConfig` | Devuelve la única instancia de la clase. Si no existe, la crea. |
| **getSettings** | `getSettings(): DeepReadonly<Ref<IAppSettings>>` | Devuelve el estado actual de la configuración de forma reactiva y de solo lectura. |
| **setTheme** | `setTheme(theme: 'light' \| 'dark'): void` | Cambia el tema de la aplicación y guarda el cambio en localStorage. |
| **setLanguage** | `setLanguage(lang: 'es' \| 'en' \| 'fr'): void` | Cambia el idioma de la interfaz. |
| **setFontSize** | `setFontSize(size: 'small' \| 'medium' \| 'large'): void` | Ajusta el tamaño base de la fuente. |
| **setFontFamily** | `setFontFamily(font: 'Arial' \| 'Verdana' \| 'Georgia'): void` | Cambia la familia de fuente de la aplicación. |

## 3. Guía de Uso

### Cómo leer la configuración (Componente Consumidor)
Para reaccionar a los cambios de configuración (ej. cambiar clases CSS), usa `getSettings`. No necesitas observadores extra, la reactividad de Vue se encarga de todo.

```typescript
<script setup lang="ts">
import { AppConfig } from '@/services/AppConfig';
import { computed } from 'vue';

// 1. Obtener la instancia y los settings
const config = AppConfig.getInstance();
const settings = config.getSettings();

// 2. Usar en un computed o directamente en el template
const themeClass = computed(() => `theme-${settings.value.theme}`);
</script>
```
## Cómo modificar la configuración (Componente Modificador)
Para cambiar un valor, utiliza los métodos set... de la instancia. Estos métodos actualizan el estado global y guardan en localStorage automáticamente.

```TypeScript

<script setup lang="ts">
import { AppConfig } from '@/services/AppConfig';

const config = AppConfig.getInstance();

function activarModoOscuro() {
  // Al ejecutar esto, todos los componentes se actualizarán al instante
  config.setTheme('dark'); 
}

function cambiarIdiomaEsp() {
  config.setLanguage('es');
}
</script>

```
## 4. Interfaz IAppSettings
Esta interfaz define la estructura estricta de datos que maneja el objeto de configuración. Es útil para saber qué valores exactos se permiten (por ejemplo, 'light' o 'dark', pero no 'blue').

``` TypeScript

export interface IAppSettings {
  // Tema visual de la interfaz
  theme: 'light' | 'dark';
  
  // Idioma de los textos de la UI
  language: 'es' | 'en' | 'fr';
  
  // Tamaño de la tipografía base
  fontSize: 'small' | 'medium' | 'large';
  
  // Fuente principal de la aplicación
  fontFamily: 'Arial' | 'Verdana' | 'Georgia';
}
```