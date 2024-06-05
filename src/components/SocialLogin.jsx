import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import facebook from '../assets/facebook.png'
import google from '../assets/search.png'
import { toast } from "react-toastify";

const SocialLogin = () => {

    const { googleSignIn, facebookSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const axiosPublic = useAxiosPublic();

    const hanldeGoogle = () => {
        googleSignIn()
            .then(async (result) => {
                toast.success('Sign Up Sucessfull', {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    theme: "light",
                });
                navigate(from, { replace: true });
                const userInfo = {
                    email: result.user?.email,
                    name: result.user.displayName,
                    image: result.user?.photoURL,
                }
                try {
                    await axiosPublic.post('/users', userInfo);
                }
                catch (error) {
                    console.error('Error deleting:', error);
                }
            })
            .catch(error => {
                toast.error(error)
                console.log(error.code)
            })
    }


    const hanldeFacebook = () => {
        facebookSignIn()
            .then(async (result) => {
                toast.success('Sign Up Sucessfull', {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    theme: "light",
                });
                navigate(from, { replace: true });
                // const userInfo = {
                //     email: result.user?.email,
                //     name: result.user.displayName,
                // }
                // try {
                //     await axiosPublic.post('/users', userInfo);
                // }
                // catch (error) {
                //     console.error('Error deleting:', error);
                // }
            })
            .catch(error => {
                toast.error(error)
                console.log(error.code)
            })
    }

    return (
        <div className='social flex justify-between gap-5'>
            <button onClick={hanldeGoogle}><img src={google}></img> Google</button>
            <button onClick={hanldeFacebook}><img src={facebook}></img>Facebook</button>
        </div>
    );
};

export default SocialLogin;