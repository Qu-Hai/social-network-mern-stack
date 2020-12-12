import { SAVE_CHAT } from './../actions/actionTypes';
export default function (state = { payload: [] }, action) {
  switch (action.type) {
    case SAVE_CHAT:
      return { payload: [...state.payload, action.payload] };
    default:
      return state;
  }
}
