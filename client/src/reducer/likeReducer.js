import { LIKE_STATUS } from './../actions/actionTypes';
export default function (state = [], action) {
  switch (action.type) {
    case LIKE_STATUS:
      return action.payload;
    default:
      return state;
  }
}
