import { UPDATE_USER } from './actionTypes';
import axios from 'axios';
export function updateUser(data) {
  return (dispatch) => {
    axios.post('http://localhost:5000/users/update', data).then((res) => {
      dispatch({
        type: UPDATE_USER,
        payload: res,
      });
      window.location.assign('/')
    });
  };
}
