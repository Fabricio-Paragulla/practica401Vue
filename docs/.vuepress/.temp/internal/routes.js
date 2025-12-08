export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"C:/Users/Belén/OneDrive/Escritorio/Tareas grado superior/2DAW/DW-ENTORNO-CLIENTE/fundamentos-js/Pr1-tema4/practica4/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Documentación del Proyecto"} }],
  ["/patrones/Factory.html", { loader: () => import(/* webpackChunkName: "patrones_Factory.html" */"C:/Users/Belén/OneDrive/Escritorio/Tareas grado superior/2DAW/DW-ENTORNO-CLIENTE/fundamentos-js/Pr1-tema4/practica4/docs/.vuepress/.temp/pages/patrones/Factory.html.js"), meta: {"title":"Patrón Factoría: Notificaciones"} }],
  ["/patrones/Singleton.html", { loader: () => import(/* webpackChunkName: "patrones_Singleton.html" */"C:/Users/Belén/OneDrive/Escritorio/Tareas grado superior/2DAW/DW-ENTORNO-CLIENTE/fundamentos-js/Pr1-tema4/practica4/docs/.vuepress/.temp/pages/patrones/Singleton.html.js"), meta: {"title":"Patrón Singleton: AppConfig"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"C:/Users/Belén/OneDrive/Escritorio/Tareas grado superior/2DAW/DW-ENTORNO-CLIENTE/fundamentos-js/Pr1-tema4/practica4/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
