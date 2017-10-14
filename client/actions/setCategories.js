
export const SET_CATEGORIES = 'set_categories';

export function setCategories(catName) {
	let categories = {
		womensFashion: ['Dresses', 'T-Shirts', 'Tops & Blouses']
	}
	return {
	  type: SET_CATEGORIES,
	  payload: categories[catName]
	}
}