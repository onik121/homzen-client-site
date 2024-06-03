import img from '../assets/Login-cuate.png'
import { Link } from 'react-router-dom';
import SocialLogin from '../components/SocialLogin';

const Login = () => {
    return (
        <div className='h-screen max-w-[1440px] mx-auto px-4 flex items-center'>
            <div className='w-full box-shadow rounded-lg register h-auto'>
                <div className='form-box flex items-center py-8'>
                    <div className='w-full'>
                        <h1 className='text-center text-3xl font-medium mb-10 -mt-2'>Login Your Account</h1>
                        <div className='w-full flex items-center justify-center'>
                            <div className='max-w-[400px] w-full'>
                                <form className='space-y-5'>
                                    <div>
                                        <label>Email</label>
                                        <input type="text" name="" />
                                    </div>
                                    <div>
                                        <label>Password</label>
                                        <input type="text" name="" />
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