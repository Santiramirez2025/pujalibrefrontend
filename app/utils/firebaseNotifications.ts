import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

/**
 * 📌 Solicita permisos para recibir notificaciones push en Android/iOS.
 */
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('📢 Permiso de notificaciones concedido.');
    return true;
  } else {
    console.log('🚫 Permiso de notificaciones denegado.');
    return false;
  }
}

/**
 * 📌 Obtiene el token FCM y lo envía al backend.
 */
async function getFCMToken() {
  try {
    const token = await messaging().getToken();
    console.log('🔥 FCM Token:', token);

    if (token) {
      // Enviar el token al backend
      await fetch('https://tu-api.com/guardar-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fcmToken: token, userId: 'ID_DEL_USUARIO' }),
      });
    }
  } catch (error) {
    console.error('❌ Error obteniendo el token FCM:', error);
  }
}

/**
 * 📌 Maneja la recepción de notificaciones en primer y segundo plano.
 */
function setupNotificationListeners() {
  // Notificación en primer plano
  messaging().onMessage(async (remoteMessage) => {
    console.log('🔔 Notificación en primer plano:', remoteMessage);
    Alert.alert(remoteMessage.notification?.title, remoteMessage.notification?.body);
  });

  // Notificación en segundo plano o app cerrada
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('📩 Notificación en segundo plano:', remoteMessage);
  });

  // Notificación cuando el usuario toca la notificación
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log('📨 Usuario tocó la notificación:', remoteMessage);
  });

  // Manejar notificación si la app estaba cerrada y se abre desde una notificación
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log('🟢 La app se abrió desde una notificación:', remoteMessage);
      }
    });
}

// ✅ Exportación corregida
export default {
  requestUserPermission,
  getFCMToken,
  setupNotificationListeners,
};
