import { useEffect } from 'react';
import Home from './pages/Home.jsx';
import { getCurrentUser } from './services/user.services.js';
import { useDispatch } from 'react-redux';
import { setUserData } from './redux/slice/user.slice.js';

function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    const currentUser = async () => {
      try {
        await getCurrentUser().then((res) => {
          dispatch(setUserData(res));
        })
      } catch (error) {
        if (error.response.status === 401) {
          dispatch(setUserData(null));
        }
      }
    };
    currentUser();
  }, []);
  return (
    <>
      <Home />
    </>
  )
}

export default App
