// src/notifications/Notifiers.ts
import type { INotifier } from './INotifier';

export class EmailNotifier implements INotifier {
  send(message: string): void {
    console.log(`[EMAIL] 📧 Enviando correo: "${message}"`);
  }
}

export class SmsNotifier implements INotifier {
  send(message: string): void {
    console.log(`[SMS] 📱 Enviando SMS: "${message}"`);
  }
}

export class PushNotifier implements INotifier {
  send(message: string): void {
    console.log(`[PUSH] 🔔 Enviando Push Notification: "${message}"`);
  }
}
