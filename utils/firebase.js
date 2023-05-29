import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyBahspfoH5UMt4NdjGleSjlQmE98Q9YK6Q",
  authDomain: "my--app-8ae04.firebaseapp.com",
  projectId: "my--app-8ae04",
  storageBucket: "my--app-8ae04.appspot.com",
  messagingSenderId: "1091630970007",
  appId: "1:1091630970007:web:0edb77984107d6ed2ae5d2",
  measurementId: "G-YXRL3ZQ9PC"
};
const app = !firebase.apps.length ?firebase.initializeApp(firebaseConfig) : firebase.app()
const db = app.firestore();
export default db