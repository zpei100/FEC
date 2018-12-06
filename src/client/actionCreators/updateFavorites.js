import axios from 'axios';

export const UPDATE_FAVORITES = 'UPDATE_FAVORITES';

export default function (id) {
  return (dispatch) => {
    axios.post('http://localhost:3001/updateFavorites', {id}).then(({data: newFavorites}) => {
      dispatch({
        type: UPDATE_FAVORITES,
        payload: newFavorites
      })
    })
  }
}