import { combineReducers } from 'redux';
import statusReducer from './statusReducer';
import usersReducer from './usersReducer';
import profileReducer from './profileReducer';
import roomReducer from './roomReducer';
import chatReducer from './chatReducer';
import updateReducer from './updateReducer';
import likeReducer from './likeReducer';

const rootReducer = combineReducers({
  status: statusReducer,
  users: usersReducer,
  profile: profileReducer,
  room: roomReducer,
  chat: chatReducer,
  updateUser: updateReducer,
  like: likeReducer,
});
export default rootReducer;
