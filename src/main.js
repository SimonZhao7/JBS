import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAqMVnxGikQ4ilzOICIk8dO0Fy-kOvXfPc",
  authDomain: "rideshare-6c04b.firebaseapp.com",
  projectId: "rideshare-6c04b",
  storageBucket: "rideshare-6c04b.appspot.com",
  messagingSenderId: "393013386646",
  appId: "1:393013386646:web:37ad05621c399a110611b7",
  measurementId: "G-LMD6SXEJBS"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)

app.mount('#app')
