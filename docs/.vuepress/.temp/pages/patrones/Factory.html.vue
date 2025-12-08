<template><div><h1 id="patron-factoria-notificaciones" tabindex="-1"><a class="header-anchor" href="#patron-factoria-notificaciones"><span>Patrón Factoría: Notificaciones</span></a></h1>
<h2 id="_1-concepto" tabindex="-1"><a class="header-anchor" href="#_1-concepto"><span>1. Concepto</span></a></h2>
<p>El <strong>Patrón Factoría</strong> (Factory Pattern) es un patrón de creación que nos permite crear objetos sin especificar la clase exacta del objeto que se creará.</p>
<p>En este sistema de notificaciones, esto es muy útil porque el componente de la interfaz no necesita saber <em>cómo</em> se envía un email o un SMS, ni qué clase lo gestiona. Solo pide &quot;un notificador de tipo X&quot; y la factoría se encarga del resto. Esto evita tener bloques <code v-pre>if/else</code> repartidos por toda la aplicación.</p>
<h2 id="_2-la-interfaz-inotifier" tabindex="-1"><a class="header-anchor" href="#_2-la-interfaz-inotifier"><span>2. La Interfaz INotifier</span></a></h2>
<p>Todos los notificadores deben cumplir este contrato. Esto permite el polimorfismo: tratar a todos los objetos igual, sin importar si son SMS, Email o Push.</p>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code class="language-typescript"><span class="line"><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">INotifier</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">send</span><span class="token punctuation">(</span>message<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-la-notificationfactory" tabindex="-1"><a class="header-anchor" href="#_3-la-notificationfactory"><span>3. La notificationFactory</span></a></h2>
<p>Esta función es el núcleo del patrón. Centraliza la creación de instancias recibiendo un tipo (string) y devolviendo el objeto concreto listo para usar.</p>
<div class="language-TypeScript line-numbers-mode" data-highlighter="prismjs" data-ext="TypeScript"><pre v-pre><code class="language-TypeScript"><span class="line"></span>
<span class="line">export function notificationFactory(type: NotificationType): INotifier {</span>
<span class="line">  switch (type) {</span>
<span class="line">    case 'email':</span>
<span class="line">      return new EmailNotifier();</span>
<span class="line">    case 'sms':</span>
<span class="line">      return new SmsNotifier();</span>
<span class="line">    case 'push':</span>
<span class="line">      return new PushNotifier();</span>
<span class="line">    default:</span>
<span class="line">      throw new Error('Tipo de notificación no soportado');</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-como-anadir-un-nuevo-notificador-ej-whatsapp" tabindex="-1"><a class="header-anchor" href="#_4-como-anadir-un-nuevo-notificador-ej-whatsapp"><span>4. Cómo Añadir un Nuevo Notificador (Ej. WhatsApp)</span></a></h2>
<p>Gracias al patrón Factoría, el sistema es fácilmente extensible. Estos son los pasos para añadir un nuevo tipo, por ejemplo, WhatsApp:</p>
<p>Crear la clase: Crear WhatsAppNotifier que implemente INotifier.</p>
<p>Actualizar Tipos: Añadir 'whatsapp' al tipo NotificationType.</p>
<p>Actualizar Factoría: Añadir un nuevo case 'whatsapp' en el switch de la factoría para que devuelva la instancia de la nueva clase.</p>
<p>Actualizar UI: (Opcional) Añadir la opción en el selector <code v-pre>&lt;select&gt;</code> del componente Vue.</p>
</div></template>


