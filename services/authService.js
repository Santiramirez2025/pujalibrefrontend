import { auth } from '../utils/firebaseConfig';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  getIdToken 
} from 'firebase/auth';

// Registro de usuario
export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error en el registro:', error.message);
    throw error; // Relanzamos el error para manejarlo en el frontend
  }
};

// Inicio de sesión
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error en el login:', error.message);
    throw error; // Relanzamos el error
  }
};

// Cerrar sesión
export const logout = async () => {
  try {
    await signOut(auth);
    console.log('Usuario deslogueado');
    return true; // Retornamos true para indicar que se cerró sesión con éxito
  } catch (error) {
    console.error('Error al cerrar sesión:', error.message);
    throw error;
  }
};

// Obtener el token de autenticación de Firebase
export const getFirebaseToken = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.warn('No hay usuario autenticado');
      return null;
    }
    return await getIdToken(user);
  } catch (error) {
    console.error('Error al obtener el token:', error);
    throw error;
  }
};
