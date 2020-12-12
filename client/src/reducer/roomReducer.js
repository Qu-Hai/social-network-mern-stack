import { SAVE_ROOM } from './../actions/actionTypes';

export default function (state = '', action) {
  switch (action.type) {
    case SAVE_ROOM:
      return action.payload;
    default:
      return state;
  }
}
