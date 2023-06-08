import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD0pEqBtXfFNjVtKKhuroYQzOU0OTiGUDg",
    authDomain: "auth-dev-c9de4.firebaseapp.com",
    projectId: "auth-dev-c9de4",
    storageBucket: "auth-dev-c9de4.appspot.com",
    messagingSenderId: "719799211836",
    appId: "1:719799211836:web:57f9f7c232a1529a44b039"
};

const app = firebase.initializeApp(firebaseConfig);

// const app = firebase.initializeApp({
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID
// });

export const auth = app.auth();
export default app;