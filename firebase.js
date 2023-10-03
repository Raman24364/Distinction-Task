


// Import Firebase
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, doc } from "firebase/firestore";
import { getDocs } from 'firebase/firestore';
// import { getDatabase, ref,push,set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBsOP8jiEl8P1mGmf2cuLua_m-oEjt7hTA",
  authDomain: "taskproject-509fa.firebaseapp.com",
  projectId: "taskproject-509fa",
  storageBucket: "taskproject-509fa.appspot.com",
  messagingSenderId: "604383211845",
  appId: "1:604383211845:web:2adbacf2b6b4b10b15ce2c",
  measurementId: "G-M3264FQ4JC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
export{storage, db, doc, getDocs}

