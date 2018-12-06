import { UPDATE_FAVORITES } from '../actionCreators/updateFavorites';

export default function(state = {}, action) {
  switch (action.type) {
    case UPDATE_FAVORITES: {
      return Object.assign({}, state, {favorites: action.payload}) 
    } default: return state;
  }
}