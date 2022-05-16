import { configureStore } from '@reduxjs/toolkit';
import _ from 'lodash';

import userInfoReducer from '../reducers/users/users_reducer';
import currentUserIndexReducer from '../reducers/users/current_user_index';

let users_info = localStorage.getItem('users_info')

let preloadedState = {
    'user_info': users_info === "null" || _.isEmpty(users_info) ? [] : JSON.parse(users_info),
    'current_index': {value: -1}
}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__);

export default configureStore({
  reducer: {
    'user_info': userInfoReducer,
    'current_index': currentUserIndexReducer,
  }, preloadedState, 
  composeEnhancers
});
