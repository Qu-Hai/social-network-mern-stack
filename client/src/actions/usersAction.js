import callAPI from './../utils/apiCaller';
import { GET_USERS } from './actionTypes';
export function getUsers() {
  return (dispatch) => {
    callAPI('users', 'GET', null).then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    });
  };
}
