import comp from "C:/Users/Belén/OneDrive/Escritorio/Tareas grado superior/2DAW/DW-ENTORNO-CLIENTE/fundamentos-js/Pr1-tema4/practica4/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"Documentación del Proyecto\",\"lang\":\"es-ES\",\"frontmatter\":{\"home\":true,\"heroImage\":\"https://v2.vuepress.vuejs.org/images/hero.png\",\"actions\":[{\"text\":\"Ver Patrón Singleton\",\"link\":\"/patrones/Singleton.html\",\"type\":\"primary\"},{\"text\":\"Ver Patrón Factory\",\"link\":\"/patrones/Factory.html\",\"type\":\"secondary\"}]},\"git\":{},\"filePathRelative\":\"README.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
