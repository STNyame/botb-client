import playerReducer from "./player/reducer";
import { combineReducers } from "redux";
// import someFeatureReducer from "./someFeature/reducer";

const reducer = combineReducers({
  // someFeature: someFeatureReducer
  player: playerReducer,

  // etc...
});

export default reducer;
