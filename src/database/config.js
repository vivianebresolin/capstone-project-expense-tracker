import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8nleRDWiusyzUSxzNspr6fZYt8t-Wg7A",
  authDomain: "cashcompass-app.firebaseapp.com",
  projectId: "cashcompass-app",
  storageBucket: "cashcompass-app.appspot.com",
  messagingSenderId: "955752715408",
  appId: "1:955752715408:web:7a3fa6253a313ecdee7415"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);