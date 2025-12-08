import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite' // <--- IMPORTANTE

export default defineUserConfig({
  lang: 'es-ES',
  title: 'Documentación Práctica 4',
  description: 'Ejercicios de patrones de diseño en Vue',

  // --- AQUI ESTÁ LA SOLUCIÓN AL ERROR ---
  bundler: viteBundler(),
  // -------------------------------------

  theme: defaultTheme({
    navbar: [
      { text: 'Inicio', link: '/' },
      { text: 'Patrones', link: '/patrones/Singleton.html' },
    ],
    sidebar: [
      {
        text: 'Patrones de Diseño',
        children: [
          '/patrones/Singleton.md',
          '/patrones/Factory.md',
        ],
      },
    ],
  }),
})
