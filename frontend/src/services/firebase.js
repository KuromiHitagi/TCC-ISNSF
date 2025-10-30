// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, getRedirectResult } from "firebase/auth";

// Your web app's Firebase configuration
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

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Configure Google Provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Function to sign in with Google
export const signInWithGoogle = async () => {
  try {
    // Try popup method first
    const result = await signInWithPopup(auth, googleProvider);
    // IMPORTANT: Use Firebase ID token, not Google OAuth credential token
    const user = result.user;
    const token = await user.getIdToken(true); // Firebase ID token
    return { token, user };
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Function to handle redirect result
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      const user = result.user;
      const token = await user.getIdToken(true); // Firebase ID token
      return { token, user };
    }
    return null;
  } catch (error) {
    console.error('Error handling redirect result:', error);
    throw error;
  }
};

export default app;
