import Axios from '../axios/Axios';

let isLogin = async () => {
  let { data } = await Axios.get('/islogin');
  console.log(data);
  return data;
};
export default isLogin;
