import { SAVE_CHAT } from './actionTypes';
export function saveChat(data) {
  return (dispatch) => {
    dispatch({
      type: SAVE_CHAT,
      payload: data,
    });
  };
}
