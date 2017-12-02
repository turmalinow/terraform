import { combineReducers } from "redux";

import UserReducer from './reducer_user';
import GamesReducer from './reducer_games';

export default combineReducers({
  user: UserReducer,
  games: GamesReducer
});
