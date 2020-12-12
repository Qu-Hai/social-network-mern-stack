import { GET_PROFILE } from './actionTypes';
import axios from 'axios';
export function getProfile() {
  return (dispatch) => {
    axios.post('http://localhost:5000/users/profile').then((res) => {
      const IDUser = `${res.data.currentUser._id}`;
      localStorage.setItem('IDUser', IDUser);
      dispatch({
        type: GET_PROFILE,
        payload: res.data.currentUser,
      });
    });
  };
}
