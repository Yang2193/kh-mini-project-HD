import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDo1JYdWvha_ug675upv-Rp8AibT2J_l_Y",
  authDomain: "miniproject-e5a73.firebaseapp.com",
  projectId: "miniproject-e5a73",
  storageBucket: "miniproject-e5a73.appspot.com",
  messagingSenderId: "794523477528",
  appId: "1:794523477528:web:a92e78241f3a77cfef056d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);