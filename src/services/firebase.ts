import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
 apiKey: 'AIzaSyD540hNdhZWvoBP9ufJEoDmk_0bHXCJtIY',
 authDomain: 'campushub-e3f30.firebaseapp.com',
 projectId: 'campushub-e3f30',
 storageBucket: 'campushub-e3f30.firebasestorage.app',
 messagingSenderId: '558543425779',
 appId: '1:558543425779:web:650a8b9f0db37cdc666786',
};
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
function createAuth() {
 try { return initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) }); }
 catch (error) {
  if ((error as { code?: string }).code === 'auth/already-initialized') return getAuth(app);
  throw error;
 }
}
export const auth = createAuth();
auth.languageCode = 'ru';
