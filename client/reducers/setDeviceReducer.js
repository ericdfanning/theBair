import { SET_DEVICE } from '../actions/setDevice.js'

export function isMobile(state = null, action) {
  switch(action.type) {
    case SET_DEVICE:
    console.log('mobile reducer', action.payload)
      return action.payload

    default:
      return state
  }
}