import { SET_SEARCHED_ITEM } from '../actions/setSearchedItem.js'

export function setSearchedItem(state = {}, action) {
  switch(action.type) {
    case SET_SEARCHED_ITEM:
    console.log('setting searched item', action.payload)
      return action.payload

    default:
      return state
  }
}