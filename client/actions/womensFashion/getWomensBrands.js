import axios from 'axios'

export const FETCH_BRANDS = 'fetch_brands';

const ROOT_URL = process.env.NODE_ENV === 'production' ? 'http://thebairdata.com': 'http://localhost:8000'
// const ROOT_URL = 'http://localhost:8000'

// ***** SET UP ACTION FOR MEMOIZATION AND CONNECT TO STORE *******

export function getBrands(category) {

	const request = axios.get(`${ROOT_URL}/category/${category}`)

	return {
	  type: FETCH_BRANDS,
	  payload: request
	}
}