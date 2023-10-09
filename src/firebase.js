import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC4NEX-HJOqlljl1U08YhUVk18DA-yScFc",
  authDomain: "book-lending-platform.firebaseapp.com",
  projectId: "book-lending-platform",
  storageBucket: "book-lending-platform.appspot.com",
  messagingSenderId: "733696012421",
  appId: "1:733696012421:web:9448b7f965293737b8b9ec",
  measurementId: "G-S74W8FK63R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Auth instance for the app
const auth = getAuth(app);

// Initialize Realtime Database
const db = getDatabase(app);

// Initialize Firebase Storage
const storage = getStorage(app);

export { auth, db, storage, GoogleAuthProvider, onAuthStateChanged, signOut };
