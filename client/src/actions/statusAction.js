import { GET_STATUS } from './actionTypes';
import axios from 'axios';
export function getStatus() {
  return (dispatch) => {
    axios.get('http://localhost:5000/').then((res) => {
      dispatch({
        type: GET_STATUS,
        payload: res.data,
      });
    });
  };
}
