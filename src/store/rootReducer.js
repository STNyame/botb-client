import playerReducer from "./player/reducer";
import userReducer from "./user/reducer";
import tribeReducer from "./tribe/reducer";
import gameReducer from "./game/reducer";
import { combineReducers } from "redux";
// import someFeatureReducer from "./someFeature/reducer";

const reducer = combineReducers({
  // someFeature: someFeatureReducer
  player: playerReducer,
  user: userReducer,
  game: gameReducer,
  tribe: tribeReducer,
  // etc...
});

export default reducer;
