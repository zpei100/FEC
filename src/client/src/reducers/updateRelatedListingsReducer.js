import { UPDATE_RELATED_LISTINGS } from "../actionCreators/updateRelatedListings";

export default function(state = [], action) {
  switch (action.type) {
    case UPDATE_RELATED_LISTINGS: {
      return action.payload;
    }
    default: return state;
  }
}