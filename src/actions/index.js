import firebase from 'firebase';
import 'firebase/firestore';

import FIREBASE_CONFIG from '../firebase';

firebase.initializeApp(FIREBASE_CONFIG);

export const SET_USER = 'set_user';

export function setUser(user) {
  console.debug("setUser actionCreator for " + (user ? user.email : 'anonymous'));
  return {
    type: SET_USER,
    payload: user
  };
}

export function authorize() {
  console.debug("authorize actionCreator");
  return (dispatch) => {
    console.debug("start listening for authStateChange");
    firebase.auth().onAuthStateChanged((user) => {
        console.debug("authStateChanged, dispatching setUser");
        dispatch(setUser(user));
    });
  };
}

export function signIn() {
  console.debug("signIn actionCreator");
  return (dispatch) => {
    console.debug("signIn with google popup");
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(function (error) {
      let {code, message, email, credential} = error;
      console.error(code + ": " + message + " for " + email + " with " + credential);
    });
  };
}

export function signOut() {
  console.debug("signOut actionCreator");
  return dispatch => {
    console.debug("signOut using google");
    firebase.auth().signOut();
  };
}

export const FETCH_GAMES_STARTED = 'FETCH_GAMES_STARTED';

export function fetchGamesStarted() {
  console.debug("fetchGamesStarted actionCreator");
  return {
    type: FETCH_GAMES_STARTED
  };
}

export const FETCH_GAMES_FINISHED = 'FETCH_GAMES_FINISHED';

export function fetchGamesFinished() {
  console.debug("fetchGamesFinished actionCreator");
  return {
    type: FETCH_GAMES_FINISHED
  };
}

export const UNSUBSCRIBE_FROM_GAMES_LIST = 'UNSUBSCRIBE_FROM_GAMES_LIST';

export function unsubscribe(type, callback) {
  console.debug("unsubscribe action creator for " + type);
  return { type, callback };
}

export const FETCH_GAMES = 'FETCH_GAMES';

export function fetchGames(snapshot) {
  console.debug("fetchGames actionCreator");
  return {
    type: FETCH_GAMES,
    payload: snapshot
  };
}

export function subscribeForGamesList(user) {
  console.debug("subscribeForGamesList actionCreator");
  return (dispatch) => {
    console.debug("dispatching fetchGamesStarted for " + user.email);
    dispatch(fetchGamesStarted());
    const unsubscribeFromGamesList = firebase.firestore().collection('games')
      .where('players.' + user.uid, '>', 0)
      .orderBy('players.' + user.uid, 'desc')
      .onSnapshot((snapshot) => {
        console.debug("firestore snapshot just arrived");
        dispatch(fetchGames(snapshot));
        console.debug("dispatching fetchGamesFinished");
        dispatch(fetchGamesFinished());
      });
    dispatch(unsubscribe(UNSUBSCRIBE_FROM_GAMES_LIST, unsubscribeFromGamesList));
  };
}

export function createGame(data) {
  const user = firebase.auth().currentUser;
  return dispatch => {
    data.players = {
      [user.uid]: Date.now()
    };
    data.owner = user.uid;
    data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    firebase.firestore().collection("games").add(data)
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };
}

export function deleteGame(id) {
  return dispatch => {
    firebase.firestore().collection("games").doc(id).delete()
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  };
}

export function joinGame(id) {
  const user = firebase.auth().currentUser;
  console.debug("joinGame actionCreator for user " + user.email + " and game " + id);
  const data = {
    ["players." + user.uid]: Date.now()
  };
  console.debug("data to update game with");
  console.dir(data);
  return dispatch => {
    firebase.firestore().collection("games").doc(id).update(data)
    .then(function() {
      console.debug("Document successfully updated!");
    })
    .catch(function(error) {
      console.error("Error updating document: ", error);
    });
  };
}
