// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAm-bf5i3MTV9l3p4k1RUenCLVOr5Evbo4",
  authDomain: "movies-poka-pro.firebaseapp.com",
  projectId: "movies-poka-pro",
  storageBucket: "movies-poka-pro.firebasestorage.app",
  messagingSenderId: "618961244610",
  appId: "1:618961244610:web:4805d665601da29f7fc65b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;