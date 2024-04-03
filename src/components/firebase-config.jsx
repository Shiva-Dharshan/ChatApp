// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS4UswQIYOmgXznLM_3ttoMdaeRO52q0k",
  authDomain: "chatapp-65f2c.firebaseapp.com",
  projectId: "chatapp-65f2c",
  storageBucket: "chatapp-65f2c.appspot.com",
  messagingSenderId: "532652954939",
  appId: "1:532652954939:web:d30f5e9c20da1c7420131e",
  measurementId: "G-R6VTKNHW7B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app)
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app)

