import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8JEIqzjZB1w2E-06N3osdMOuQ3Bj5oH4",
  authDomain: "mock-interviewer.firebaseapp.com",
  projectId: "mock-interviewer",
  storageBucket: "mock-interviewer.appspot.com",
  messagingSenderId: "86973994091",
  appId: "1:86973994091:web:9dd4ab62bff575931e8d2e"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;