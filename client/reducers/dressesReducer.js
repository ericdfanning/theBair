import { FETCH_DRESSES } from '../actions/womensFashion/dresses.js'

export function dresses(state = {}, action) {
  switch(action.type) {
    case FETCH_DRESSES: 
    console.log('reducer for dresses', action.payload, 'response', action.payload.response)
      return {
      	data: '',
      	pageCount: 0,
      	brandsCount: 0
      }

    default:
      return state
  }
}
