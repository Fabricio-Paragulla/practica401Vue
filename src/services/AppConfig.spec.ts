// src/services/AppConfig.spec.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AppConfig } from './AppConfig';

describe('AppConfig Singleton', () => {

  // Limpiamos el localStorage antes de cada test para evitar contaminación
  beforeEach(() => {
    localStorage.clear();
    // Nota: Como el Singleton mantiene la instancia en memoria,
    // reiniciar completamente un Singleton estático en tests es truculento.
    // Para este ejercicio asumiremos que la reactividad funciona,
    // pero en un entorno real a veces necesitamos un método `resetInstance` solo para tests.
  });

  it('Debe mantener la unicidad (Singleton)', () => {
    const instancia1 = AppConfig.getInstance();
    const instancia2 = AppConfig.getInstance();

    // Comprobamos que son EXACTAMENTE el mismo objeto en memoria
    expect(instancia1).toBe(instancia2);
  });

  it('Debe modificar el estado reactivo correctamente', () => {
    const config = AppConfig.getInstance();

    // Cambiamos a dark
    config.setTheme('dark');

    // Verificamos
    expect(config.getSettings().value.theme).toBe('dark');
  });

  it('Debe persistir los datos en localStorage', () => {
    const config = AppConfig.getInstance();

    // Espiamos el método setItem de localStorage
    const spy = vi.spyOn(Storage.prototype, 'setItem');

    config.setLanguage('fr');

    // Verificamos que se llamó a localStorage
    expect(spy).toHaveBeenCalled();
    // Verificamos que se guardó con la clave correcta
    expect(spy).toHaveBeenCalledWith('app-config', expect.stringContaining('"language":"fr"'));
  });
});
