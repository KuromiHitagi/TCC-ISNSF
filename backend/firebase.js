// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvsK8GMVEKQK3QrC6oTD9PjgIM3-n_oRc",
  authDomain: "tecvagas-5173.firebaseapp.com",
  projectId: "tecvagas-5173",
  storageBucket: "tecvagas-5173.firebasestorage.app",
  messagingSenderId: "623654581395",
  appId: "1:623654581395:web:419b8e83d683206ced4966",
  measurementId: "G-2L8526YDXP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);