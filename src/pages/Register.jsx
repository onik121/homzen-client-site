
import img from '../assets/Mobile login-pana.png'
import { Link } from 'react-router-dom';
import SocialLogin from '../components/SocialLogin';
import { useForm } from "react-hook-form"


const Register = () => {

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }

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
                                <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <label>Name</label>
                                        <input type="text" name="name" {...register("name", { required: true })} />
                                        {errors.name && <span className='text-red-600'>Name is required</span>}
                                    </div>
                                    <div>
                                        <label>Email</label>
                                        <input type="text" name="email" />
                                    </div>
                                    <div>
                                        <label>Photo Url</label>
                                        <input type="text" name="photo" />
                                    </div>
                                    <div>
                                        <label>Password</label>
                                        <input type="text" name="password" />
                                    </div>
                                    <button className='button w-full'>Sign Up</button>
                                </form>
                                <div className='text-center my-4'>
                                    <p className='font-medium'>- Or Sign Up With - </p>
                                </div>
                                <SocialLogin></SocialLogin>
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