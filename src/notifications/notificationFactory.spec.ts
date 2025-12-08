// src/notifications/notificationFactory.spec.ts
import { describe, it, expect } from 'vitest';
import { notificationFactory } from './notificationFactory';
import { EmailNotifier, SmsNotifier, PushNotifier } from './Notifiers';

describe('Patrón Factoría: NotificationFactory', () => {

  it('Debe crear una instancia de EmailNotifier', () => {
    const notifier = notificationFactory('email');
    expect(notifier).toBeInstanceOf(EmailNotifier);
  });

  it('Debe crear una instancia de SmsNotifier', () => {
    const notifier = notificationFactory('sms');
    expect(notifier).toBeInstanceOf(SmsNotifier);
  });

  it('Debe crear una instancia de PushNotifier', () => {
    const notifier = notificationFactory('push');
    expect(notifier).toBeInstanceOf(PushNotifier);
  });

  it('Debe lanzar un error si el tipo no existe', () => {
    // Usamos 'any' para engañar a TypeScript y probar el caso de error en runtime
    expect(() => notificationFactory('telegram' as any)).toThrowError(/no soportado/);
  });
});
