import { FETCH_SEARCH_ITEMS } from '../actions/getSearchItems.js'

export function searchItems(state = {}, action) {
  switch(action.type) {
    case FETCH_SEARCH_ITEMS:
      return action.payload.data

    default:
      return state
  }
}