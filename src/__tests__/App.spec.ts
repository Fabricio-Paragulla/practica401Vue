import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('se monta y muestra los títulos de los ejercicios', () => {
    const wrapper = mount(App)
    // Buscamos el texto que SÍ has puesto en tu menú
    expect(wrapper.text()).toContain('Ejercicio 4.1: Singleton')
    expect(wrapper.text()).toContain('Ejercicio 4.2: Factory')
  })
})
