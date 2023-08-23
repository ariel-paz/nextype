// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDiJon6vESoxBHTR8_w2Cb1iCEj5qDYKo8',
  authDomain: 'mis-gastos-28ad8.firebaseapp.com',
  projectId: 'mis-gastos-28ad8',
  storageBucket: 'mis-gastos-28ad8.appspot.com',
  messagingSenderId: '877756032430',
  appId: '1:877756032430:web:b03db4d81df376fed5d43f',
  measurementId: 'G-LKJPTVRXTV',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
// export const analytics = getAnalytics(app);
