// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiZeXT8Vjv49RLZMe8RqkcElOUYoRXEjg",
  authDomain: "fusion-studio-630df.firebaseapp.com",
  projectId: "fusion-studio-630df",
  storageBucket: "fusion-studio-630df.firebasestorage.app",
  messagingSenderId: "250744825142",
  appId: "1:250744825142:web:6f10329ecfa2476e963f97",
  measurementId: "G-LP2FFHFVVE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
