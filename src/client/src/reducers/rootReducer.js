import { combineReducers } from "redux";
import changeActiveReducer from './changeActiveReducer'
import updateRelatedListingsReducer from "./updateRelatedListingsReducer";
import toggleModalReducer from './toggleModalReducer';
import updateFavorites from './updateFavorites';
import descriptionReducer from './descriptionReducer';

const getRoom = function(state = {}, action) {
  switch (action.type) {
    case 'GET_ROOM': return action.payload;
    default: return state;
  }
}

export default combineReducers({
  activeImage: changeActiveReducer,
  relatedListings: updateRelatedListingsReducer,
  showModal: toggleModalReducer,
  room: getRoom,
  user: updateFavorites,
  description: descriptionReducer
})