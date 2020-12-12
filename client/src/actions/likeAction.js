import { LIKE_STATUS } from './actionTypes';
import axios from 'axios';
export function likeStatus(action, id, data) {
  console.log(action, id, data);
  return (dispatch) => {
    axios.patch(`http://localhost:5000/${action}/${id}`, data).then((res) => {
      dispatch({
        type: LIKE_STATUS,
        payload: res,
      });
    });
  };
}
