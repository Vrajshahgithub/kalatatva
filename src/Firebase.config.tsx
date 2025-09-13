import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg9Y5AuGb5roijTJZ6nJQROwlLUeyQFXc",
  authDomain: "artcraft-ae264.firebaseapp.com",
  projectId: "artcraft-ae264",
  storageBucket: "artcraft-ae264.appspot.com",
  messagingSenderId: "845646174012",
  appId: "1:845646174012:web:60037c207caf0dfdbb7039",
  measurementId: "G-0QV7J5NZMX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only in production
let analytics;
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  analytics = getAnalytics(app);
}

// Export Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);