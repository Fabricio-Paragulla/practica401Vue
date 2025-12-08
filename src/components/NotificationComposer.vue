<script setup lang="ts">
import { ref, computed } from 'vue';
import { notificationFactory, type NotificationType } from '@/notifications/notificationFactory';

// --- ESTADO ---
const selectedType = ref<NotificationType>('email');
const recipient = ref(''); // Campo extra visual para igualar la foto
const message = ref('');
// Guardamos objetos en el log para poder pintarlos bonitos (tipo, mensaje, fecha, status)
const logs = ref<{ type: NotificationType; msg: string; time: string; success: boolean }[]>([]);

// --- LÓGICA ---
const sendNotification = () => {
  if (!message.value.trim()) {
    alert('Por favor escribe un mensaje.');
    return;
  }

  try {
    // 1. EL PATRÓN FACTORÍA EN ACCIÓN:
    // No hacemos "new EmailNotifier()", le pedimos a la fábrica que nos lo dé.
    const notifier = notificationFactory(selectedType.value);

    // 2. Usamos el objeto (Polimorfismo: no nos importa cuál es, todos tienen .send)
    notifier.send(message.value);

    // 3. Añadimos al log visual
    logs.value.unshift({
      type: selectedType.value,
      msg: message.value,
      time: new Date().toLocaleTimeString(),
      success: true // Simulamos que siempre va bien
    });

    // Limpieza
    message.value = '';
    recipient.value = '';

  } catch (error) {
    console.error(error);
  }
};

// --- ICONOS Y LABELS DINÁMICOS ---
const currentLabel = computed(() => {
  switch(selectedType.value) {
    case 'email': return 'Recipient Email';
    case 'sms': return 'Phone Number';
    case 'push': return 'User ID / Token';
  }
});
</script>

<template>
  <div class="simulator-container">
    <header>
      <h2>Notification Factory Simulator</h2>
    </header>

    <div class="layout-grid">

      <div class="card compose-card">
        <h3>Compose Notification</h3>

        <div class="form-group">
          <label>Notification Type</label>
          <select v-model="selectedType">
            <option value="email">📧 Email</option>
            <option value="sms">📱 SMS</option>
            <option value="push">🔔 Push Notification</option>
          </select>
        </div>

        <div class="form-group">
          <label>{{ currentLabel }}</label>
          <input type="text" v-model="recipient" :placeholder="`e.g., ${selectedType === 'email' ? 'user@example.com' : '+34...'}`" />
        </div>

        <div class="form-group">
          <label>Message</label>
          <textarea v-model="message" rows="4" placeholder="Compose your message..."></textarea>
        </div>

        <button @click="sendNotification" class="btn-send">
          Send Notification
        </button>
      </div>

      <div class="card log-card">
        <h3>Notification Log</h3>

        <div v-if="logs.length === 0" class="empty-state">
          No notifications sent yet.
        </div>

        <div v-else class="logs-list">
          <div v-for="(log, index) in logs" :key="index" class="log-item">
            <div class="log-icon" :class="log.type">
              <span v-if="log.type === 'email'">📧</span>
              <span v-if="log.type === 'sms'">📱</span>
              <span v-if="log.type === 'push'">🔔</span>
            </div>

            <div class="log-content">
              <div class="log-header">
                <strong>{{ log.type.toUpperCase() }} Notification</strong>
                <span class="status success">● Sent</span>
              </div>
              <p class="log-msg">{{ log.msg }}</p>
              <span class="log-time">{{ log.time }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Contenedor General */
.simulator-container {
  max-width: 1000px;
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
  color: #333;
}
header h2 { margin-bottom: 30px; }

/* Grid de 2 columnas (Izquierda pequeña, Derecha grande) */
.layout-grid {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 30px;
  align-items: start;
}

/* Tarjetas */
.card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
}

/* Formulario */
.form-group { margin-bottom: 20px; }
label { display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 8px; color: #444; }
input, select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
  font-family: inherit;
}
input:focus, textarea:focus, select:focus { outline: 2px solid #0099ff; background: white; }

.btn-send {
  width: 100%;
  padding: 12px;
  background-color: #0088cc;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-send:hover { background-color: #0077b3; }

/* Logs (Estilo lista de la foto) */
.log-item {
  display: flex;
  gap: 15px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 15px;
  background: #fff;
}
.log-icon {
  width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%;
  background: #f0f0f0;
  font-size: 1.2rem;
}
/* Colores suaves para los iconos */
.log-icon.email { background: #e3f2fd; color: #1565c0; }
.log-icon.sms { background: #e8f5e9; color: #2e7d32; }
.log-icon.push { background: #fff3e0; color: #ef6c00; }

.log-content { flex: 1; }
.log-header { display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 5px; }
.status.success { color: #2e7d32; font-size: 0.8rem; font-weight: 600; }
.log-msg { margin: 0; color: #666; font-size: 0.95rem; margin-bottom: 5px; }
.log-time { font-size: 0.75rem; color: #999; }
</style>
