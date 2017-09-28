
export const SET_CATEGORIES = 'set_categories';

export function setCategories(catName) {
	let categories = {
		womensFashion: ['Dresses', 'T-Shirts', 'Tops/Blouses']
	}
	console.log('categories action', catName, categories[catName])
	return {
	  type: SET_CATEGORIES,
	  payload: categories[catName]
	}
}