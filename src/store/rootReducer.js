import playerReducer from "./player/reducer";
import userReducer from "./user/reducer";
import dataReducer from "./data/reducer";
import gamesReducer from "./games/reducer";
import { combineReducers } from "redux";
// import someFeatureReducer from "./someFeature/reducer";

const reducer = combineReducers({
  // someFeature: someFeatureReducer
  player: playerReducer,
  user: userReducer,
  games: gamesReducer,
  data: dataReducer,
  // etc...
});

export default reducer;
