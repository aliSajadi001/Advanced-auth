import axios from 'axios';
let Axios = axios.create({
  baseURL: 'http://localhost:3030/',
  withCredentials: true,
});
export default Axios;
