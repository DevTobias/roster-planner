import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB0Flwvf6lF1nrMfUfWn_I3l8Z8jxNAY0A',
  authDomain: 'roster-planner.firebaseapp.com',
  projectId: 'roster-planner',
  storageBucket: 'roster-planner.appspot.com',
  messagingSenderId: '635548498578',
  appId: '1:635548498578:web:19dae4d7e92fd3d0e9844b',
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const auth = getAuth(app);
