import axios from 'axios'

export const FETCH_DRESSES = 'fetch_dresses';

// const ROOT_URL = process.env.NODE_ENV === 'production' ? 'http://www.myrentopia.com': 'http://localhost:8000'
const ROOT_URL = 'http://localhost:8000'

export function getDresses() {
	const request = axios.get(`${ROOT_URL}/womensfashion/dresses`)
	console.log('in the dresses action', request)
	return {
	  type: FETCH_DRESSES,
	  payload: request
	}
}