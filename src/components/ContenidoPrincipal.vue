<script setup lang="ts">
import { AppConfig } from '@/services/AppConfig';
import { computed } from 'vue';

const settings = AppConfig.getInstance().getSettings();

// Clases dinámicas para aplicar el tema y tamaño
const previewClasses = computed(() => ({
  'theme-light': settings.value.theme === 'light',
  'theme-dark': settings.value.theme === 'dark',
  [`size-${settings.value.fontSize}`]: true
}));

const computedStyles = computed(() => ({
  fontFamily: settings.value.fontFamily
}));
</script>

<template>
  <div class="live-preview-container">
    <h3>Live Preview</h3>

    <div class="preview-canvas" :class="previewClasses" :style="computedStyles">

      <h1>Example Heading (H1)</h1>
      <h2>Sub-heading (H2)</h2>

      <p class="sample-text">
        This is a sample paragraph. The quick brown fox jumps over the lazy dog.
        Adjusting the settings on the left will change the appearance of all elements
        in this preview panel, giving you immediate feedback.
      </p>

      <div class="demo-actions">
        <button class="btn-primary">Primary Action</button>
        <button class="btn-default">Default</button>
        <button class="btn-disabled" disabled>Disabled</button>
      </div>

      <div class="demo-inputs">
        <input type="text" placeholder="Example text input" />
        <select>
          <option>Dropdown option 1</option>
        </select>
      </div>

      <div class="internal-card">
        <h4>Card Title</h4>
        <p>This card component demonstrates how surface colors, borders, and shadows are affected by your theme choices.</p>
        <button class="btn-primary-soft">Read More</button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.live-preview-container h3 { margin-top: 0; margin-bottom: 15px; }

/* El marco general del preview (borde punteado en la foto, aquí borde solido suave) */
.preview-canvas {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 40px;
  transition: all 0.3s ease;
  min-height: 500px;
}

/* --- ESTILOS TEMAS (Light vs Dark) --- */
.theme-light {
  background-color: #ffffff;
  color: #212529;
}
.theme-light .internal-card {
  border: 1px solid #eee;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.theme-dark {
  background-color: #1a1a1a;
  color: #f0f0f0;
  border-color: #333;
}
.theme-dark .internal-card {
  background-color: #2a2a2a;
  border: 1px solid #333;
}
.theme-dark input, .theme-dark select {
  background-color: #333;
  color: white;
  border-color: #444;
}

/* --- TAMAÑOS --- */
.size-small { font-size: 14px; }
.size-medium { font-size: 16px; }
.size-large { font-size: 20px; }

/* --- ELEMENTOS DEMO --- */
h1 { margin-top: 0; font-weight: 800; }
h2 { font-weight: 600; opacity: 0.8; }
.sample-text { line-height: 1.6; color: inherit; opacity: 0.8; margin-bottom: 25px; }

.demo-actions { display: flex; gap: 10px; margin-bottom: 25px; }
.demo-inputs { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px; }

/* Botones Demo */
.btn-primary { background: #0066ff; color: white; border: none; padding: 10px 20px; border-radius: 6px; }
.btn-default { background: #eee; color: #333; border: 1px solid #ccc; padding: 10px 20px; border-radius: 6px; }
.btn-disabled { opacity: 0.5; cursor: not-allowed; }

/* Inputs Demo */
input, select {
  width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ccc;
}

/* Tarjeta Interna */
.internal-card {
  padding: 20px;
  border-radius: 8px;
}
.btn-primary-soft {
  background: #e6f0ff; color: #0066ff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600;
}
</style>
