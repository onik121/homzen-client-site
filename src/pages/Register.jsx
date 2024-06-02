
import img from '../assets/Mobile login-pana.png'
import facebook from '../assets/facebook.png'
import google from '../assets/search.png'
import { Link } from 'react-router-dom';


const Register = () => {
    return (
        <div className='h-screen max-w-[1440px] mx-auto px-4 flex items-center'>
            <div className='w-full box-shadow rounded-lg register h-auto'>
                <div className='flex items-center justify-center'>
                    <img src={img}></img>
                </div>
                <div className='form-box flex items-center py-8'>
                    <div className='w-full'>
                        <h1 className='text-center text-3xl font-medium mb-10 -mt-2'>Create An Account</h1>
                        <div className='w-full flex items-center justify-center'>
                            <div className='max-w-[400px] w-full'>
                                <form className='space-y-5'>
                                    <div>
                                        <label>Name</label>
                                        <input type="text" name="" />
                                    </div>
                                    <div>
                                        <label>Email</label>
                                        <input type="text" name="" />
                                    </div>
                                    <div>
                                        <label>Photo Url</label>
                                        <input type="text" name="" />
                                    </div>
                                    <div>
                                        <label>Password</label>
                                        <input type="text" name="" />
                                    </div>
                                    <button className='button w-full'>Sign Up</button>
                                </form>
                                <div className='text-center my-4'>
                                    <p className='font-medium'>- Or Sign in With - </p>
                                </div>
                                <div className='social flex justify-between gap-5'>
                                    <button><img src={google}></img> Google</button>
                                    <button><img src={facebook}></img>Facebook</button>
                                </div>
                                <div className='text-center my-4'>
                                    <p>Already Have an Account? <Link to={'/login'}><span className='font-medium'>Sign In</span></Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;