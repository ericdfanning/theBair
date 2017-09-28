import { combineReducers } from 'redux';
// import { landlordProperties, landlordTenants } from './landlordReducer'
import { womensBrands } from './womensBrandsReducer'
import { categories } from './setCategoriesReducer'
import { isMobile } from './setDeviceReducer'

const appReducer = combineReducers({
  womensBrands,
  isMobile,
  categories,
});

export default appReducer;