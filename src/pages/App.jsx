import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import { useEffect, useState } from 'react';
import isLogin from '../hook/isLogin';

function App() {
  let navigate = useNavigate();
  let [user, setUser] = useState(null);
  useEffect(() => {
    let getUser = async () => {
      let user = await isLogin();
      setUser(user);
    };
    getUser();
  }, []);
  if (user) {
    user.success ? navigate('/') : navigate('/login');
  }
  return (
    <div className="w-full h-[100vh] home  ">
      <nav>
        <Navbar user={user}/>
      </nav>
    </div>
  );
}

export default App;
