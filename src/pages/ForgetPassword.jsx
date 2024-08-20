import { AiOutlineMail } from 'react-icons/ai';
import { useState } from 'react';
import Axios from '../axios/Axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { TiTick } from 'react-icons/ti';

function ForgetPassword() {
  let [email, setEmail] = useState('');
  let [info, setInfo] = useState({});
  let [err, setErr] = useState({});
  let [loading, setLoading] = useState(false);

  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};

    if (!email.length) {
      errors.email = 'Email is required';
    } else if (!emailRegEx.test(email)) {
      errors.email = 'Email is not valid';
    }
    setErr(errors);
    if (Object.keys(errors).length === 0) {
      try {
        setLoading(true);
        let { data } = await Axios.post('auth/forget-password', {
          email,
        });
        if (data.success) {
          setInfo(data);
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
        Forget-Password
      </p>

      <div
        className={`border ${
          err.email ? 'border-red-800' : 'border-black'
        } focus-within:ring-1 ring-black  flex items-center gap-2 justify-center w-[80%] sm:w-[400px]  rounded-lg px-2 py-1 `}>
        <AiOutlineMail />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="  w-full bg-transparent outline-none placeholder:text-black placeholder:text-xs"
          type="email"
          placeholder="Email"
        />
      </div>
      {err.email && (
        <p className="text-sm text-red-800 font-medium">{err.email}</p>
      )}

      <Link className="text-sm font-medium underline text-blue-300" to="/login">
        Login
      </Link>
      <button
        disabled={loading}
        className="w-[80%] disabled:cursor-not-allowed sm:w-[400px] py-1 bg-cyan-500 hover:bg-cyan-700 rounded-lg font-medium text-lg ">
        Login
      </button>
      {info.success ? (
        <div className="w-[80%] font-medium text-green-500 sm:w-[400px] backdrop-blur-sm bg-opacity-10  bg-green-400 rounded-md  duration-300 transition-all">
          <p className=" p-5 flex break-all">
            An email has been sent to your account{' '}
            <span
              className="text-2xl
				">
              <TiTick />
            </span>
          </p>
        </div>
      ) : (
        <></>
      )}
    </form>
  );
}

export default ForgetPassword;
