import { combineReducers } from 'redux';
import { exampleReducer } from './exampleReducer';
import { userReducer } from './userReducer';
import anotherReducer from './anotherReducer';

const rootReducer = combineReducers({
  user: userReducer,
  example: exampleReducer,
  another: anotherReducer,
});

export default rootReducer;
