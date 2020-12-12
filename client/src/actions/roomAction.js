import { SAVE_ROOM } from './actionTypes';

export function saveRoom(data) {
  return (dispatch) => {
    dispatch({
      type: SAVE_ROOM,
      payload: data,
    });
  };
}
