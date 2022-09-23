import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCjPaanewrZObvI255MSe09rASYMOSFcQ8",
  authDomain: "ytvideo-37cd3.firebaseapp.com",
  projectId: "ytvideo-37cd3",
  storageBucket: "ytvideo-37cd3.appspot.com",
  messagingSenderId: "700348110134",
  appId: "1:700348110134:web:cf4fd86780714c4fe3cf97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app