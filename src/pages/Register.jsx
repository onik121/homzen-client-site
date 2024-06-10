
import img from '../assets/Mobile login-pana.png'
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from '../components/SocialLogin';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { Helmet } from 'react-helmet';
import { Scroll } from '../components/Scroll';


const Register = () => {

    const { createUsers, user, setUser, updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        try {
            await createUsers(data.email, data.password)
                .then(result => {
                    console.log(result.user)
                })
            toast.success('Register Successful');
            await updateUserProfile(data.name, data.photo);
            setUser({ ...user, photoURL: data.photo, displayName: data.name, email: data.email, });
            // create user entry into the database
            const userInfo = {
                name: data.name,
                email: data.email,
                image: data.photo,
            };
            try {
                await axiosPublic.post('/users', userInfo);
            }
            catch (error) {
                console.error('Error creating user in the database:', error);
            }
            reset();
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error('Registration failed');
        }
    };


    return (
        <div className='min-h-screen max-w-[1440px] mx-auto px-4 flex items-center'>
            <Scroll></Scroll>
            <Helmet>
                <title>Homzen | Register</title>
            </Helmet>
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
                                        <input type="email" name="email" {...register("email", { required: true })} />
                                        {errors.email && <span className='text-red-600'>Email is required</span>}
                                    </div>
                                    <div>
                                        <label>Photo Url</label>
                                        <input type="text" name="photo" {...register("photo", { required: true })} />
                                        {errors.photo && <span className='text-red-600'>Photo Url is required</span>}
                                    </div>
                                    <div>
                                        <label className='block'>Password</label>
                                        <input type="password" name="password" {...register("password", {
                                            required: true,
                                            maxLength: 10,
                                            minLength: 6,
                                            pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,10}$/
                                        })} />
                                        {errors.password?.type === "required" && (<p className='text-red-600'>Password is required</p>)}
                                        {errors.password?.type === "minLength" && (<p className='text-red-600'>Minimum 6 charecters</p>)}
                                        {errors.password?.type === "maxLength" && (<p className='text-red-600'>Maximum 10 charecters</p>)}
                                        {errors.password?.type === "pattern" && (
                                            <p className='text-red-600'>Password must include uppercase, lowercase, number, and special character</p>
                                        )}
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