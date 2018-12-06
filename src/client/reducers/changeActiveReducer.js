import { CHANGE_ACTIVE_IMAGE } from '../actionCreators/changeActiveImage'

export default function(state = 0, action) {
  switch (action.type) {
    case CHANGE_ACTIVE_IMAGE: {
      return action.payload;
    }

    default: return state;
  }

}