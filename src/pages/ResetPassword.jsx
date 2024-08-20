import { useState } from 'react';
import Axios from '../axios/Axios';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BiShow } from 'react-icons/bi';
import { BiHide } from 'react-icons/bi';
import { IoKeyOutline } from 'react-icons/io5';
function ResetPassword() {
  let { token } = useParams();
  console.log(token);
  let navigate = useNavigate();
  let [password, setPassword] = useState('');
  let [err, setErr] = useState({});
  let [loading, setLoading] = useState(false);
  let [show, setShow] = useState(false);

  let passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  let handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};

    if (!password.length) {
      errors.email = 'Email is required';
    } else if (!passwordRegEx.test(password)) {
      errors.email = 'Email is not valid';
    }
    setErr(errors);
    if (Object.keys(errors).length === 0) {
      try {
        setLoading(true);
        let { data } = await Axios.post(`auth/reset-Password/${token}`, {
          password,
        });
        if (data.success) {
          navigate('/login');
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-screen flex flex-col items-center justify-center register gap-5">
      <p className="md:text-4xl text-xl text-indigo-400 break-all p-2 font-semibold scale-110 ">
        Reset-Password
      </p>

      <div
        className={`border ${
          err.password ? 'border-red-800' : 'border-black'
        } focus-within:ring-1 ring-black  flex items-center gap-2 justify-center w-[80%] sm:w-[400px]  rounded-lg px-2 py-1 `}>
        <IoKeyOutline />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="  w-full bg-transparent outline-none placeholder:text-black placeholder:text-xs"
          type={show ? 'text' : 'password'}
          placeholder="New Password"
        />
        {show ? (
          <BiHide
            onClick={() => setShow(!show)}
            className="cursor-pointer text-xl"
          />
        ) : (
          <BiShow
            onClick={() => setShow(!show)}
            className="cursor-pointer text-xl"
          />
        )}
      </div>

      <Link className="text-sm font-medium underline text-blue-300" to="/login">
        Login
      </Link>
      <button
        disabled={loading}
        className="w-[80%] disabled:cursor-not-allowed sm:w-[400px] py-1 bg-cyan-500 hover:bg-cyan-700 rounded-lg font-medium text-lg ">
        Login
      </button>
    </form>
  );
}

export default ResetPassword;
