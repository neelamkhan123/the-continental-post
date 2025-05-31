import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDX2Q6hEN8mJmRCC-6PPZqsjNSpBv1a5o",
  authDomain: "news-auth-eb2f2.firebaseapp.com",
  databaseURL: "https://news-auth-eb2f2-default-rtdb.firebaseio.com",
  projectId: "news-auth-eb2f2",
  storageBucket: "news-auth-eb2f2.firebasestorage.app",
  messagingSenderId: "301917894408",
  appId: "1:301917894408:web:b622149b41154c84cd1ebd",
};

// Initialize Firebase app just once
const app = initializeApp(firebaseConfig);

// Export initialized auth
export const auth = getAuth(app);
