import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDdeQMzrSA8boBEE2gsOpL3FqJJ8T5hmsg",
  authDomain: "app-trading-d3f72.firebaseapp.com",
  projectId: "app-trading-d3f72",
  storageBucket: "app-trading-d3f72.appspot.com",
  messagingSenderId: "706874044611",
  appId: "1:706874044611:web:9b30277dc0e05f61a2f276",
  measurementId: "G-PS5TJ6L156",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
