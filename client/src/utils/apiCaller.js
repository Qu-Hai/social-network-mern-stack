import axios from 'axios';
import * as Config from './../constants/Config';

export default function callAPI(endpoint, method, data) {
  return axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    data: data,
  }).catch((err) => {
    console.log(err);
  });
}
