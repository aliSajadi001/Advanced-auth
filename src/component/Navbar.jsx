import { SiAwssecretsmanager } from 'react-icons/si';
import { IoIosLogOut } from 'react-icons/io';
import { useState } from 'react';
import Axios from '../axios/Axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Navbar({ user }) {
  console.log(user);
  let navigate = useNavigate();
  let [show, setShow] = useState(false);
  let handleShow = () => {
    setShow(true);
  };
  let handleClose = () => {
    setShow(false);
  };
  let handleLogout = async () => {
    try {
      let { data } = await Axios.post('auth/logout');
      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center h-[60px] w-full bg-white justify-between px-20 bg-opacity-10 backdrop-blur-sm">
      <SiAwssecretsmanager className="text-white text-2xl" />
      <div className="flex items-center gap-6">
        <button
          onMouseEnter={handleShow}
          onMouseLeave={handleClose}
          className="relative ">
          <IoIosLogOut
            onClick={() => handleLogout()}
            className="text-black text-2xl transition-colors duration-300"
          />
          {show && (
            <p className="absolute top-[30px] text-sm bg-blatext-black backdrop-blur-xl font-medium bg-opacity-20 rounded-md p-2 transition-transform duration-300">
              Logout
            </p>
          )}
        </button>
        <p>
          {user && (
            <span className="text-black text-md font-normal">
              {user.user.email}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default Navbar;
