import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC7OKggAUqOFoVNLKmqtWcIhDbN7GSzYHc",
  authDomain: "calling-system-a46e6.firebaseapp.com",
  projectId: "calling-system-a46e6",
  storageBucket: "calling-system-a46e6.appspot.com",
  messagingSenderId: "49109585318",
  appId: "1:49109585318:web:321bc8b6ec51a825c05367"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

export { firebaseApp, auth, db, storage }