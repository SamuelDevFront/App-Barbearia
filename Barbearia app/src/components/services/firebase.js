import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDiENNznhgvOc32ii_AC5o0_M0EuXBLsU",
  authDomain: "samuca-corte-e-barba.firebaseapp.com",
  projectId: "samuca-corte-e-barba",
  storageBucket: "samuca-corte-e-barba.firebasestorage.app",
  messagingSenderId: "1036503409855",
  appId: "1:1036503409855:web:baf84f348f72f41bc6120a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);