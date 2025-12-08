<script setup lang="ts">
import { AppConfig, type IAppSettings } from '@/services/AppConfig';

const config = AppConfig.getInstance();
const settings = config.getSettings();

// --- MANEJADORES DE EVENTOS (Aquí solucionamos el error de TypeScript) ---

// 1. Manejador para el cambio de Fuente
const onFontChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  config.setFontFamily(target.value as IAppSettings['fontFamily']);
};

// 2. Manejador para el cambio de Tamaño
const onSizeChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  config.setFontSize(target.value as IAppSettings['fontSize']);
};

// 3. Manejador para el cambio de Idioma
const onLanguageChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  config.setLanguage(target.value as IAppSettings['language']);
};

// 4. Helper simple para el tema (este no daba error, pero lo dejamos aquí)
const setTheme = (t: IAppSettings['theme']) => config.setTheme(t);
</script>

<template>
  <div class="control-panel">

    <div class="section-group">
      <div class="section-title">Appearance <span>^</span></div>

      <div class="section-content">
        <label class="section-label">Theme</label>

        <div
          class="radio-option"
          :class="{ active: settings.theme === 'light' }"
          @click="setTheme('light')"
        >
          <div class="radio-circle"><div v-if="settings.theme === 'light'" class="dot"></div></div>
          <span>Light ☀️</span>
        </div>

        <div
          class="radio-option"
          :class="{ active: settings.theme === 'dark' }"
          @click="setTheme('dark')"
        >
          <div class="radio-circle"><div v-if="settings.theme === 'dark'" class="dot"></div></div>
          <span>Dark 🌙</span>
        </div>
      </div>
    </div>

    <div class="section-group">
      <div class="section-title">Typography <span>^</span></div>
      <div class="section-content">
        <label class="section-label">Font Family</label>
        <select :value="settings.fontFamily" @change="onFontChange">
          <option value="Arial">Arial (Sans-serif)</option>
          <option value="Verdana">Verdana</option>
          <option value="Georgia">Georgia (Serif)</option>
        </select>

        <label class="section-label" style="margin-top:10px">Size</label>
        <select :value="settings.fontSize" @change="onSizeChange">
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
    </div>

    <div class="section-group">
      <div class="section-title">Localization <span>^</span></div>
      <div class="section-content">
        <select :value="settings.language" @change="onLanguageChange">
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
      </div>
    </div>

  </div>
</template>

<style scoped>
.control-panel {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.section-group {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.section-title {
  padding: 15px;
  background: #fff;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
}

.section-content { padding: 15px; }

.section-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 8px;
}

/* Estilo personalizado para los Radio Buttons */
.radio-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 6px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.radio-option:hover { background: #f9f9f9; }
.radio-option.active { border-color: #0066ff; background: #f0f7ff; }

.radio-circle {
  width: 18px; height: 18px;
  border: 2px solid #ccc;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
.radio-option.active .radio-circle { border-color: #0066ff; }

.dot {
  width: 10px; height: 10px;
  background: #0066ff;
  border-radius: 50%;
}

select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
