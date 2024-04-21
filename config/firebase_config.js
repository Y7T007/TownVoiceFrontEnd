// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBrtyPK8Ie63H2PlQHk7sSDK5fOWHgtapM",
    authDomain: "townvoice-485fb.firebaseapp.com",
    projectId: "townvoice-485fb",
    storageBucket: "townvoice-485fb.appspot.com",
    messagingSenderId: "37334645629",
    appId: "1:37334645629:web:9d00301927479952b5ea14",
    measurementId: "G-GR8R1MWWJZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);