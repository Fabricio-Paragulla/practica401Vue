// src/notifications/notificationFactory.ts
import type { INotifier } from './INotifier';
import { EmailNotifier, SmsNotifier, PushNotifier } from './Notifiers';

export type NotificationType = 'email' | 'sms' | 'push';

export function notificationFactory(type: NotificationType): INotifier {
  switch (type) {
    case 'email':
      return new EmailNotifier();
    case 'sms':
      return new SmsNotifier();
    case 'push':
      return new PushNotifier();
    default:
      // Truco de TypeScript para asegurar que no se nos olvida ningún tipo
      const exhaustiveCheck: never = type;
      throw new Error(`Tipo de notificación no soportado: ${exhaustiveCheck}`);
  }
}
