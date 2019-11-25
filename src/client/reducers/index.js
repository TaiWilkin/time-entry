import { combineReducers } from 'redux';
import entriesReducer from './entriesReducer';
import authReducer from './authReducer';
import adminsReducer from './adminsReducer';

export default combineReducers({
  entries: entriesReducer,
  auth: authReducer,
  admins: adminsReducer
});
