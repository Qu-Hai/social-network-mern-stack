import { GET_STATUS } from './../actions/actionTypes';
export default function (state = [], action) {
  switch (action.type) {
    case GET_STATUS:
      return action.payload;
    default:
      return state;
  }
}
