import { useEffect } from 'react';
import Home from './pages/Home.jsx';
import { getCurrentUser } from './services/user.services.js';
import { useDispatch } from 'react-redux';
import { setUserData } from './redux/slice/user.slice.js';
import { useSnackbar } from 'notistack';

function App() {
  const dispatch = useDispatch();
  const enqueueSnackbar = useSnackbar();

  useEffect(() => {
    const currentUser = async () => {
      try {
        await getCurrentUser().then((res) => {
          dispatch(setUserData(res));
        })
      } catch (error) {
        enqueueSnackbar(error, { variant: "error" });
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
