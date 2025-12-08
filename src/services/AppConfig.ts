// src/services/AppConfig.ts
import { ref, readonly, type DeepReadonly, type Ref } from 'vue';

// 1. Interfaces
export interface IAppSettings {
  theme: 'light' | 'dark';
  language: 'es' | 'en' | 'fr';
  fontSize: 'small' | 'medium' | 'large';
  fontFamily: 'Arial' | 'Verdana' | 'Georgia';
}

// 2. Clase Singleton
export class AppConfig {
  private static instance: AppConfig;
  private readonly _settings: Ref<IAppSettings>; // Estado reactivo privado

  // Constructor Privado: Nadie fuera de aquí puede hacer 'new AppConfig()'
  private constructor() {
    const savedSettings = localStorage.getItem('app-config');
    const defaultSettings: IAppSettings = {
      theme: 'light',
      language: 'es',
      fontSize: 'medium',
      fontFamily: 'Verdana',
    };
    // Inicializamos el ref con lo guardado o los valores por defecto
    this._settings = ref(savedSettings ? JSON.parse(savedSettings) : defaultSettings);
  }

  // Método Estático para obtener la única instancia
  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  // --- API Pública ---

  // Exponemos el estado como "Solo Lectura" para que nadie lo modifique directamente sin usar los setters
  public getSettings(): DeepReadonly<Ref<IAppSettings>> {
    return readonly(this._settings);
  }

  // Setters (Modifican el estado y guardan en localStorage)
  public setTheme(theme: IAppSettings['theme']): void {
    this._settings.value.theme = theme;
    this.saveToLocalStorage();
  }

  public setLanguage(lang: IAppSettings['language']): void {
    this._settings.value.language = lang;
    this.saveToLocalStorage();
  }

  public setFontSize(size: IAppSettings['fontSize']): void {
    this._settings.value.fontSize = size;
    this.saveToLocalStorage();
  }

  public setFontFamily(font: IAppSettings['fontFamily']): void {
    this._settings.value.fontFamily = font;
    this.saveToLocalStorage();
  }

  // Método privado auxiliar para persistencia
  private saveToLocalStorage(): void {
    localStorage.setItem('app-config', JSON.stringify(this._settings.value));
  }
}
