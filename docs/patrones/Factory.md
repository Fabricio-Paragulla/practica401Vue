# Patrón Factoría: Notificaciones

## 1. Concepto
El **Patrón Factoría** (Factory Pattern) es un patrón de creación que nos permite crear objetos sin especificar la clase exacta del objeto que se creará.

En este sistema de notificaciones, esto es muy útil porque el componente de la interfaz no necesita saber *cómo* se envía un email o un SMS, ni qué clase lo gestiona. Solo pide "un notificador de tipo X" y la factoría se encarga del resto. Esto evita tener bloques `if/else` repartidos por toda la aplicación.

## 2. La Interfaz INotifier
Todos los notificadores deben cumplir este contrato. Esto permite el polimorfismo: tratar a todos los objetos igual, sin importar si son SMS, Email o Push.

```typescript
export interface INotifier {
  send(message: string): void;
}
```
## 3. La notificationFactory
Esta función es el núcleo del patrón. Centraliza la creación de instancias recibiendo un tipo (string) y devolviendo el objeto concreto listo para usar.

```TypeScript

export function notificationFactory(type: NotificationType): INotifier {
  switch (type) {
    case 'email':
      return new EmailNotifier();
    case 'sms':
      return new SmsNotifier();
    case 'push':
      return new PushNotifier();
    default:
      throw new Error('Tipo de notificación no soportado');
  }
}
```

## 4. Cómo Añadir un Nuevo Notificador (Ej. WhatsApp)
Gracias al patrón Factoría, el sistema es fácilmente extensible. Estos son los pasos para añadir un nuevo tipo, por ejemplo, WhatsApp:

Crear la clase: Crear WhatsAppNotifier que implemente INotifier.

Actualizar Tipos: Añadir 'whatsapp' al tipo NotificationType.

Actualizar Factoría: Añadir un nuevo case 'whatsapp' en el switch de la factoría para que devuelva la instancia de la nueva clase.

Actualizar UI: (Opcional) Añadir la opción en el selector `<select>` del componente Vue.