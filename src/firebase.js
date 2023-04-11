import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAvlNtnOewvJCS-EMCo-gfSLJdM85XoGck",
    authDomain: "fir-react-login-55a90.firebaseapp.com",
    projectId: "fir-react-login-55a90",
    storageBucket: "fir-react-login-55a90.appspot.com",
    messagingSenderId: "222715532053",
    appId: "1:222715532053:web:d589f2a4e2c1e15ea5cf1c",
}


const provider = new GoogleAuthProvider();


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
