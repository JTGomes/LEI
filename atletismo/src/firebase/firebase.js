import * as firebase from 'firebase';


const config = {
  apiKey: "AIzaSyAR2Iys4oVBPgIOhOfshhA5EVxhXw_9vFw",
  authDomain: "atletismobraga.firebaseapp.com",
  databaseURL: "https://atletismobraga.firebaseio.com",
  projectId: "atletismobraga",
  storageBucket: 'atletismobraga.appspot.com',
  messagingSenderId: "391796541701",
};


if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();


export {
  auth,
};
