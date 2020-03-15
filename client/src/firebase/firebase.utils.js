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
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const getUserCartRef = async userId => {
  const cartsRef = firestore.collection('carts').where('userId', '==', userId);
  const snapShot = await cartsRef.get();
  if (snapShot.empty) {
    const cartDocRef = firestore.collection('carts').doc();
    await cartDocRef.set({ userId, cartItems: [] });
    return cartDocRef;
  } else {
    return snapShot.docs[0].ref;
  }
}
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj)
  })
  return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })
  return transformCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
}
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth)
    }, reject)
  })
}
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;