import { GET_PROFILE } from './../actions/actionTypes';
export default function (state = {}, action) {
  switch (action.type) {
    case GET_PROFILE:
      return action.payload;
    default:
      return state;
  }
}
