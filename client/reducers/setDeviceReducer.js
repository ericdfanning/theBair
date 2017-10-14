import { SET_DEVICE } from '../actions/setDevice.js'

export function isMobile(state = null, action) {
  switch(action.type) {
    case SET_DEVICE:
      return action.payload

    default:
      return state
  }
}