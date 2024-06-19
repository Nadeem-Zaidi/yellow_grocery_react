// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCSOfyZKuPX1-nj5flthgBeGiZ29SFq7s0",
    authDomain: "grocery-yellow.firebaseapp.com",
    projectId: "grocery-yellow",
    storageBucket: "grocery-yellow.appspot.com",
    messagingSenderId: "482263938907",
    appId: "1:482263938907:web:7f443adf287c25c1900c7e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);