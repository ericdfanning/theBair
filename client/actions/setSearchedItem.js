export const SET_SEARCHED_ITEM = 'set_searched_item';

export function setSearchedItem(isMobile) {

	return {
	  type: SET_SEARCHED_ITEM,
	  payload: isMobile
	}
}