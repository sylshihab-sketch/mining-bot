// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "mining-bot-8e30c.firebaseapp.com",
  projectId: "mining-bot-8e30c",
  storageBucket: "mining-bot-8e30c.firebasestorage.app",
  messagingSenderId: "694631075545",
  appId: "1:694631075545:web:a9b3de75a9ee3f82bf78c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };