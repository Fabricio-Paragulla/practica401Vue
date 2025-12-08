import { GitContributors } from "C:/Users/Belén/OneDrive/Escritorio/Tareas grado superior/2DAW/DW-ENTORNO-CLIENTE/fundamentos-js/Pr1-tema4/practica4/node_modules/@vuepress/plugin-git/lib/client/components/GitContributors.js";
import { GitChangelog } from "C:/Users/Belén/OneDrive/Escritorio/Tareas grado superior/2DAW/DW-ENTORNO-CLIENTE/fundamentos-js/Pr1-tema4/practica4/node_modules/@vuepress/plugin-git/lib/client/components/GitChangelog.js";

export default {
  enhance: ({ app }) => {
    app.component("GitContributors", GitContributors);
    app.component("GitChangelog", GitChangelog);
  },
};
