import { combineReducers } from 'redux';
// import { landlordProperties, landlordTenants } from './landlordReducer'
import { womensBrands } from './womensBrandsReducer'
import { categories } from './setCategoriesReducer'
import { isMobile } from './setDeviceReducer'
import { searchItems } from './setSearchItemsReducer'
import { setSearchedItem } from './setSearchedItemReducer'

const appReducer = combineReducers({
  womensBrands,
  isMobile,
  categories,
  searchItems,
  setSearchedItem,
});

export default appReducer;