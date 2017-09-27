import { combineReducers } from 'redux';
// import { landlordProperties, landlordTenants } from './landlordReducer'
import {dresses} from './dressesReducer'
const appReducer = combineReducers({
  dresses
});

export default appReducer;