import playerReducer from "./player/reducer";
import userReducer from "./user/reducer";
import dataReducer from "./data/reducer";
import gameReducer from "./game/reducer";
import { combineReducers } from "redux";
// import someFeatureReducer from "./someFeature/reducer";

const reducer = combineReducers({
  // someFeature: someFeatureReducer
  player: playerReducer,
  user: userReducer,
  game: gameReducer,
  data: dataReducer,
  // etc...
});

export default reducer;
