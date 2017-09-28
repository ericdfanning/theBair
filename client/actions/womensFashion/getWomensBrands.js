import axios from 'axios'

export const FETCH_BRANDS = 'fetch_brands';

// const ROOT_URL = process.env.NODE_ENV === 'production' ? 'http://www.myrentopia.com': 'http://localhost:8000'
const ROOT_URL = 'http://localhost:8000'

export function getBrands(category) {
	const request = axios.get(`${ROOT_URL}/${category}`)

	return {
	  type: FETCH_BRANDS,
	  payload: request
	}
}