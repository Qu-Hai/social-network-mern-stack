import { UPDATE_USER } from './../actions/actionTypes';
export default function (state = [], action) {
  switch (action.type) {
    case UPDATE_USER:
      return action.payload;
    default:
      return state;
  }
}
