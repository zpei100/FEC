export const CHANGE_ACTIVE_IMAGE = 'CHANGE_ACTIVE_IMAGE'

export default function(newActive) {
  return {
    type: CHANGE_ACTIVE_IMAGE,
    payload: newActive
  }
}