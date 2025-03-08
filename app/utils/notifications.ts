import messaging from '@react-native-firebase/messaging';

export async function getFCMToken(userId: string) {
  try {
    // Obtener el token FCM del dispositivo
    const token = await messaging().getToken();
    console.log('FCM Token:', token);

    if (token) {
      // Enviar el token al backend para almacenarlo en la base de datos
      await fetch('https://tu-api.com/notificaciones/guardar-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fcmToken: token,
          userId: userId, // ID real del usuario autenticado
        }),
      });
    }
  } catch (error) {
    console.error('Error obteniendo el token FCM:', error);
  }
}

// 👇 Se agrega export default para evitar el error de expo-router
export default {
  getFCMToken,
};
