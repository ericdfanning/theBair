import axios from 'axios'

export const FETCH_SEARCH_ITEMS = 'fetch_search_items';

const ROOT_URL = process.env.NODE_ENV === 'production' ? 'http://thebairdata.com': 'http://localhost:8000'
// const ROOT_URL = 'http://localhost:8000'

// ***** SET UP ACTION FOR MEMOIZATION AND CONNECT TO STORE *******

export function getSearchItems(category) {
	console.log('sending request for search items')
	const request = axios.get(`${ROOT_URL}/search`)

	return {
	  type: FETCH_SEARCH_ITEMS,
	  payload: request
	}
}