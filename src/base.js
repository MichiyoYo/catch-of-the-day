import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD4nrMRm_psgvAhMrm59Hcn9uJi2L9VG74",
  authDomain: "catch-of-the-day-cree-v2.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-cree-v2-default-rtdb.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

//this is a named export
export { firebaseApp };

//this is a default export
export default base;
