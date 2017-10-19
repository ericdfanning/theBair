import { FETCH_BRANDS } from '../actions/womensFashion/getWomensBrands.js'

export function womensBrands(state = null, action) {
  switch(action.type) {
    case FETCH_BRANDS:

      return {
      	data: action.payload.data.data,
      	pageCount: action.payload.data.pageCount,
      	brandsCount: action.payload.data.brandsCount
      }

    default:
      return state
  }
}
