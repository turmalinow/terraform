import {
  FETCH_GAMES,
  FETCH_GAMES_STARTED,
  FETCH_GAMES_FINISHED,
  UNSUBSCRIBE_FROM_GAMES_LIST,
  SET_USER
} from '../actions';

function extractGamesData(snapshot) {
  console.debug("extracting games data from snapshot");
  let data = [];
  snapshot.forEach(doc => {
    let element = doc.data();
    element._id = doc.id;
    data.push(element);
  });
  return data;
}

export default function(state = {data: []}, action) {
  switch (action.type) {
    case FETCH_GAMES_STARTED:
      return {...state, loading: true};
    case FETCH_GAMES_FINISHED:
      return {...state, loading: false};
    case UNSUBSCRIBE_FROM_GAMES_LIST:
      return {...state, cancel: action.callback};
    case FETCH_GAMES:
      return {...state, data: extractGamesData(action.payload)};
    case SET_USER:
      return action.payload ? {data: []} : state;
    default:
      return state;
  }
};
