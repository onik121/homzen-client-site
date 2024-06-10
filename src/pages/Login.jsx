import img from '../assets/Login-cuate.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../components/SocialLogin';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { Scroll } from '../components/Scroll';

const Login = () => {

    const { loginUser } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const onSubmit = async (data) => {
        loginUser(data.email, data.password)
            .then(() => {
                toast.success('SignIn Sucessfull')
                reset();
                navigate(from, { replace: true });
            })
            .catch(error => {
                // console.log(error.code)
                toast.error('Incorrect email or password.')
                reset();
            })
    }

    return (
        <div className='min-h-screen max-w-[1440px] mx-auto px-4 flex items-center'>
            <Scroll></Scroll>
            <Helmet>
                <title>Homzen | Login</title>
            </Helmet>
            <div className='w-full box-shadow rounded-lg register h-auto'>
                <div className='form-box flex items-center py-8'>
                    <div className='w-full'>
                        <h1 className='text-center text-3xl font-medium mb-10 -mt-2'>Login Your Account</h1>
                        <div className='w-full flex items-center justify-center'>
                            <div className='max-w-[400px] w-full'>
                                <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <label>Email</label>
                                        <input type="text" name="email" {...register("email", { required: true })} />
                                        {errors.email && <span className='text-red-600'>Email is required</span>}
                                    </div>
                                    <div>
                                        <label>Password</label>
                                        <input type="password" name="password" {...register("password", { required: true })} />
                                        {errors.password && <span className='text-red-600'>Password is required</span>}
                                    </div>
                                    <button className='button w-full'>Sign In</button>
                                </form>
                                <div className='text-center my-4'>
                                    <p className='font-medium'>- Or Sign in With - </p>
                                </div>
                                <SocialLogin></SocialLogin>
                                <div className='text-center my-4'>
                                    <p>Dont You Have an Account? <Link to={'/register'}><span className='font-medium'>Sign Up</span></Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <img className='w-[85%]' src={img}></img>
                </div>
            </div>
        </div>
    );
};

export default Login;