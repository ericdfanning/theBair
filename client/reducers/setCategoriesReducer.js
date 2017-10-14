import { SET_CATEGORIES } from '../actions/setCategories.js'

export function categories(state = [], action) {
  switch(action.type) {
    case SET_CATEGORIES:
      return action.payload

    default:
      return state
  }
}