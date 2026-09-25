import { useDispatch, useSelector } from 'react-redux';
import { api } from '../utils/axios.js';
import { auth, googleProvider } from '../utils/firebase.js';
import { signInWithPopup } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";
import { setUserData } from '../redux/slice/user.slice.js';
import { useSnackbar } from 'notistack';

function Home() {
    const { userData } = useSelector(state => state.user)
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    console.log(userData);
    const handleLogin = async (token) => {
        try {
            const user = await api.post("/auth/login", { token });
            dispatch(setUserData(user.data));
            enqueueSnackbar("Login successful", { variant: "success" });
        } catch (error) {
            enqueueSnackbar(error.response.data.error, { variant: "error" });
        }
    }
    const googleLogin = async () => {
        const data = await signInWithPopup(auth, googleProvider);
        const token = await data.user.getIdToken();
        await handleLogin(token);
        console.log(data);
    }

    return (
        <div className='h-screen flex bg-[#273438] text-[#142024] overflow-hidden'>
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-[#41676e]/[40] backdrop-blur-sm'>

                {
                    !userData ? (
                        <div className='w-[340px] bg-[#86b0bd] border border-[#86b0bd]/[0.8] rounded-2xl p-7 flex flex-col gap-5'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-2xl text-center font-medium'>Welcome to QueenAI</h1>
                                <p className='text-sm text-center'>Please login to continue with app</p>
                            </div>

                            <button onClick={googleLogin}
                                className='bg-[#048bba] text-white font-medium py-2 rounded-2xl flex items-center justify-center gap-2
                         hover:bg-[#048bba]/[0.5] bg-linear-gradient from-[#048bba] to-[#048bba]/[0.5] border border-[#048bba]/[0.8]
                         shadow-lg shadow-black/20 hover:shadow-lg hover:shadow-black/30 transition-all duration-300 cursor-pointer'
                            >
                                <FcGoogle size={24} className='text-[#048bba]' />
                                <span>Sign in with Google</span>
                            </button>
                        </div>
                    ) : (
                        <div className='w-[340px] bg-[#86b0bd] border border-[#86b0bd]/[0.8] rounded-2xl p-7 flex flex-col gap-5'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-2xl text-center font-medium'>Welcome to QueenAI</h1>
                                <p className='text-sm text-center'>You are logged in as {userData.email}</p>
                            </div>
                        </div>
                    )
                }



            </div>
        </div>
    )
}

export default Home
