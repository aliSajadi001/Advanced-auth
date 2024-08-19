import { IoKeyOutline } from 'react-icons/io5';
import { AiOutlineMail } from 'react-icons/ai';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { BiShow } from 'react-icons/bi';
import { BiHide } from 'react-icons/bi';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Axios from '../axios/Axios';
function Register() {
  let navigate = useNavigate();
  let [show, setShow] = useState(false);
  let [email, setEmail] = useState('');
  let [userName, setUserName] = useState('');
  let [password, setPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [err, setErr] = useState({});

  let passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  let handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    if (userName.length < 3) {
      errors.name = 'UserName must be mor 3 characters';
    } else if (!userName) {
      errors.name = 'UserName is required';
    }
    if (!email.length) {
      errors.email = 'Email is required';
    } else if (!emailRegEx.test(email)) {
      errors.email = 'Email is not valid';
    }
    if (!passwordRegEx.test(password)) {
      errors.password = 'The password must include a to (a-z , A-Z , 0-9)';
    } else if (!password) {
      errors.password = 'Password is required';
    }
    setErr(errors);
    if (Object.keys(errors).length === 0) {
      try {
        setLoading(true);
        let { data } = await Axios.post('auth/register', {
          userName,
          email,
          password,
        });
        if (data.success) {
          toast.success(data.message);
          setEmail('');
          setPassword('');
          setUserName('');
          navigate('/verify-email');
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
        Register
      </p>
      <div
        className={`border ${
          err.name ? 'border-red-800' : 'border-black'
        } focus-within:ring-1 ring-black  flex items-center gap-2 justify-center w-[80%] sm:w-[400px]  rounded-lg px-2 py-1 `}>
        <MdOutlineDriveFileRenameOutline />
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="  w-full bg-transparent outline-none placeholder:text-black placeholder:text-xs "
          type="text"
          placeholder="UserName"
        />
      </div>
      {err.name && (
        <p className="text-sm text-red-800 font-medium">{err.name}</p>
      )}
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
          placeholder="************"
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
      {err.password && (
        <p className="text-sm text-red-800 font-medium">{err.password}</p>
      )}
      <button
        disabled={loading}
        className="w-[80%] disabled:cursor-not-allowed sm:w-[400px] py-1 bg-cyan-500 hover:bg-cyan-700 rounded-lg font-medium text-lg">
        Submit
      </button>
    </form>
  );
}

export default Register;
