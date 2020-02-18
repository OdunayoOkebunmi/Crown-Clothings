import firebase from 'firebase/app';
import 'firebase/firestore'; //for db
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCja8YWJBJhq1A7anlJgZHCfRToILeV1Wc",
  authDomain: "crown-clothing-9a84b.firebaseapp.com",
  databaseURL: "https://crown-clothing-9a84b.firebaseio.com",
  projectId: "crown-clothing-9a84b",
  storageBucket: "crown-clothing-9a84b.appspot.com",
  messagingSenderId: "490046439744",
  appId: "1:490046439744:web:94d672dc8be15c3b63faa5",
  measurementId: "G-KY359BJMXX"
}

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();


// setup google auth

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' }); // this means we want to always trigger the select google account options
export const signinWithGoogleMethod = () => auth.signInWithPopup(provider);

export default firebase;