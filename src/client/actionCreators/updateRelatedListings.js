export const UPDATE_RELATED_LISTINGS = 'UPDATE_RELATED_LISTINGS';

export default function(rooms) {
  return {
    type: UPDATE_RELATED_LISTINGS,
    payload: rooms
  };
}
