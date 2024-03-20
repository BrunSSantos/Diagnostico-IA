// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2owzPf8fluVtn3SNOpv6vJ8GwN1tqEl8",
  authDomain: "imagens-site-tg.firebaseapp.com",
  projectId: "imagens-site-tg",
  storageBucket: "imagens-site-tg.appspot.com",
  messagingSenderId: "554063346700",
  appId: "1:554063346700:web:a2b28b96ad224a58580229"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;