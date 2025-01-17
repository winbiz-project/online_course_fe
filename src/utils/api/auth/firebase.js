import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAr0hA_gyPKenKfRVArfc51hnkks8s9Td4",
  authDomain: "winbiz-firebase.firebaseapp.com",
  databaseURL: "https://winbiz-firebase-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "winbiz-firebase",
  storageBucket: "winbiz-firebase.appspot.com",
  messagingSenderId: "1098421850773",
  appId: "1:1098421850773:web:71b3ec520076f1fa40419c",
  measurementId: "G-39ZX43M6H5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;