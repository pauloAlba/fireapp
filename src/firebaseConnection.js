
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyCb5tEy8Dx7hCp0rWRufv0bQE-D8avYDxo",
  authDomain: "curso-64b94.firebaseapp.com",
  projectId: "curso-64b94",
  storageBucket: "curso-64b94.appspot.com",
  messagingSenderId: "307562855866",
  appId: "1:307562855866:web:e1cd49079e40a8a1f7b183",
  measurementId: "G-6Y258N4L4Z"
};

const firebaseapp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseapp);
const auth = getAuth(firebaseapp)

export { db, auth };
