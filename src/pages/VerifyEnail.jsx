import { useState } from 'react';
import Axios from '../axios/Axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
function VerifyEmail() {
  let navigate = useNavigate();

  let [codeInput, setCode] = useState(new Array(8).fill(''));
  let [loading, setLoading] = useState(false);
  let [err, setErr] = useState({});

  let handleChange = (e, i) => {
    if (isNaN(e.target.value)) return false;

    setCode([
      ...codeInput.map((data, index) => (index === i ? e.target.value : data)),
    ]);
    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    } else if (e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    let code = codeInput.join('');
    let errors = {};
    if (code.length < 8) {
      errors.code = 'The code must be 8 digits';
    }
    setErr(errors);
    console.log(Object.keys(errors).length);
    if (Object.keys(errors).length === 0) {
      try {
        setLoading(true);
        let { data } = await Axios.post('auth/verify-email', {
          code,
        });
        if (data.success) {
          toast.success(data.message);
          navigate('/');
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
        Verify-Email
      </p>
      <div className="flex items-center justify-center flex-col">
        <div className="flex items-center justify-center sm:gap-5 gap-1 ">
          {codeInput.map((data, index) => {
            return (
              <input
                type="text"
                value={data}
                onChange={(e) => handleChange(e, index)}
                className="sm:w-[30px] sm:h-[30px] bg-transparent border border-black w-[20px]  h-[20px] rounded-md outline-none text-center focus:ring-blue-600 focus:ring-2 focus:border-none duration-200 transition-all"
                maxLength={1}
                key={index}
              />
            );
          })}
        </div>
        <p className="text-sm text-red-800 font-medium">
          {err.code && err.code}
        </p>
      </div>

      <button
        disabled={loading}
        className="w-[80%] disabled:cursor-not-allowed sm:w-[400px] py-1 bg-cyan-500 hover:bg-cyan-700 rounded-lg font-medium text-lg">
        Submit
      </button>
    </form>
  );
}

export default VerifyEmail;
