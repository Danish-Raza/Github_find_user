import { combineReducers } from 'redux';
import getReducer from './getReducer';
import loadingReducer from "./loading";

export default combineReducers({
  users: getReducer,
  loading: loadingReducer
});