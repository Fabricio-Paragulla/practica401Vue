<template><div><h1 id="patron-singleton-appconfig" tabindex="-1"><a class="header-anchor" href="#patron-singleton-appconfig"><span>Patrón Singleton: AppConfig</span></a></h1>
<h2 id="_1-proposito" tabindex="-1"><a class="header-anchor" href="#_1-proposito"><span>1. Propósito</span></a></h2>
<p>Hemos elegido el <strong>Patrón Singleton</strong> para la clase <code v-pre>AppConfig</code> con el objetivo de garantizar una <strong>única fuente de la verdad</strong> para la configuración de la aplicación.</p>
<p>En una aplicación Vue compleja, tener múltiples copias de la configuración podría llevar a inconsistencias (ej. una parte de la web en modo oscuro y otra en claro). El Singleton asegura que:</p>
<ol>
<li>Solo exista <strong>una instancia</strong> de la configuración en memoria.</li>
<li>El estado sea <strong>reactivo y global</strong>: si cambia en un lugar, se actualiza en todas partes.</li>
<li>La persistencia en <code v-pre>localStorage</code> esté centralizada en un único punto de acceso.</li>
</ol>
<h2 id="_2-api-publica" tabindex="-1"><a class="header-anchor" href="#_2-api-publica"><span>2. API Pública</span></a></h2>
<p>La clase <code v-pre>AppConfig</code> no se puede instanciar con <code v-pre>new</code>. Se debe utilizar su API estática y sus métodos públicos.</p>
<table>
<thead>
<tr>
<th style="text-align:left">Método</th>
<th style="text-align:left">Firma</th>
<th style="text-align:left">Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><strong>getInstance</strong></td>
<td style="text-align:left"><code v-pre>static getInstance(): AppConfig</code></td>
<td style="text-align:left">Devuelve la única instancia de la clase. Si no existe, la crea.</td>
</tr>
<tr>
<td style="text-align:left"><strong>getSettings</strong></td>
<td style="text-align:left"><code v-pre>getSettings(): DeepReadonly&lt;Ref&lt;IAppSettings&gt;&gt;</code></td>
<td style="text-align:left">Devuelve el estado actual de la configuración de forma reactiva y de solo lectura.</td>
</tr>
<tr>
<td style="text-align:left"><strong>setTheme</strong></td>
<td style="text-align:left"><code v-pre>setTheme(theme: 'light' | 'dark'): void</code></td>
<td style="text-align:left">Cambia el tema de la aplicación y guarda el cambio en localStorage.</td>
</tr>
<tr>
<td style="text-align:left"><strong>setLanguage</strong></td>
<td style="text-align:left"><code v-pre>setLanguage(lang: 'es' | 'en' | 'fr'): void</code></td>
<td style="text-align:left">Cambia el idioma de la interfaz.</td>
</tr>
<tr>
<td style="text-align:left"><strong>setFontSize</strong></td>
<td style="text-align:left"><code v-pre>setFontSize(size: 'small' | 'medium' | 'large'): void</code></td>
<td style="text-align:left">Ajusta el tamaño base de la fuente.</td>
</tr>
<tr>
<td style="text-align:left"><strong>setFontFamily</strong></td>
<td style="text-align:left"><code v-pre>setFontFamily(font: 'Arial' | 'Verdana' | 'Georgia'): void</code></td>
<td style="text-align:left">Cambia la familia de fuente de la aplicación.</td>
</tr>
</tbody>
</table>
<h2 id="_3-guia-de-uso" tabindex="-1"><a class="header-anchor" href="#_3-guia-de-uso"><span>3. Guía de Uso</span></a></h2>
<h3 id="como-leer-la-configuracion-componente-consumidor" tabindex="-1"><a class="header-anchor" href="#como-leer-la-configuracion-componente-consumidor"><span>Cómo leer la configuración (Componente Consumidor)</span></a></h3>
<p>Para reaccionar a los cambios de configuración (ej. cambiar clases CSS), usa <code v-pre>getSettings</code>. No necesitas observadores extra, la reactividad de Vue se encarga de todo.</p>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code class="language-typescript"><span class="line"><span class="token operator">&lt;</span>script setup lang<span class="token operator">=</span><span class="token string">"ts"</span><span class="token operator">></span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> AppConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@/services/AppConfig'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> computed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 1. Obtener la instancia y los settings</span></span>
<span class="line"><span class="token keyword">const</span> config <span class="token operator">=</span> AppConfig<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> settings <span class="token operator">=</span> config<span class="token punctuation">.</span><span class="token function">getSettings</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 2. Usar en un computed o directamente en el template</span></span>
<span class="line"><span class="token keyword">const</span> themeClass <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">theme-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>settings<span class="token punctuation">.</span>value<span class="token punctuation">.</span>theme<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="como-modificar-la-configuracion-componente-modificador" tabindex="-1"><a class="header-anchor" href="#como-modificar-la-configuracion-componente-modificador"><span>Cómo modificar la configuración (Componente Modificador)</span></a></h2>
<p>Para cambiar un valor, utiliza los métodos set... de la instancia. Estos métodos actualizan el estado global y guardan en localStorage automáticamente.</p>
<div class="language-TypeScript line-numbers-mode" data-highlighter="prismjs" data-ext="TypeScript"><pre v-pre><code class="language-TypeScript"><span class="line"></span>
<span class="line">&lt;script setup lang=&quot;ts&quot;&gt;</span>
<span class="line">import { AppConfig } from '@/services/AppConfig';</span>
<span class="line"></span>
<span class="line">const config = AppConfig.getInstance();</span>
<span class="line"></span>
<span class="line">function activarModoOscuro() {</span>
<span class="line">  // Al ejecutar esto, todos los componentes se actualizarán al instante</span>
<span class="line">  config.setTheme('dark'); </span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">function cambiarIdiomaEsp() {</span>
<span class="line">  config.setLanguage('es');</span>
<span class="line">}</span>
<span class="line">&lt;/script&gt;</span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-interfaz-iappsettings" tabindex="-1"><a class="header-anchor" href="#_4-interfaz-iappsettings"><span>4. Interfaz IAppSettings</span></a></h2>
<p>Esta interfaz define la estructura estricta de datos que maneja el objeto de configuración. Es útil para saber qué valores exactos se permiten (por ejemplo, 'light' o 'dark', pero no 'blue').</p>
<div class="language-TypeScript line-numbers-mode" data-highlighter="prismjs" data-ext="TypeScript"><pre v-pre><code class="language-TypeScript"><span class="line"></span>
<span class="line">export interface IAppSettings {</span>
<span class="line">  // Tema visual de la interfaz</span>
<span class="line">  theme: 'light' | 'dark';</span>
<span class="line">  </span>
<span class="line">  // Idioma de los textos de la UI</span>
<span class="line">  language: 'es' | 'en' | 'fr';</span>
<span class="line">  </span>
<span class="line">  // Tamaño de la tipografía base</span>
<span class="line">  fontSize: 'small' | 'medium' | 'large';</span>
<span class="line">  </span>
<span class="line">  // Fuente principal de la aplicación</span>
<span class="line">  fontFamily: 'Arial' | 'Verdana' | 'Georgia';</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


