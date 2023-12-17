import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyASWc_gpT1o0QnAzjM3opRqjK_EJRlY-30",
  authDomain: "reactnative-a035f.firebaseapp.com",
  projectId: "reactnative-a035f",
  storageBucket: "reactnative-a035f.appspot.com",
  messagingSenderId: "117616152620",
  appId: "1:117616152620:web:b75c93ce3e1e6f16a9c189"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
export {
  app,
  auth,
  db,
};