import playerReducer from "./player/reducer";
import userReducer from "./user/reducer";
import { combineReducers } from "redux";
// import someFeatureReducer from "./someFeature/reducer";

const reducer = combineReducers({
  // someFeature: someFeatureReducer
  player: playerReducer,
  user: userReducer,
  // etc...
});

export default reducer;
