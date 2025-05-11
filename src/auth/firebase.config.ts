import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.F_API_KEY,
  authDomain: process.env.F_AUTH_DOMAIN,
  projectId: process.env.F_PROJECT_ID,
  storageBucket: process.env.F_STORAGE_BUCKET,
  messagingSenderId: process.env.F_MESSAGING_SENDER_ID,
  appId: process.env.F_APP_ID,
  measurementId: process.env.F_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
