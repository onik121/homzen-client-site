import { Link } from 'react-router-dom';
import errorImg from '../assets/no-results.png'

const Error = () => {
    return (
        <div className='min-h-screen flex items-center justify-center text-center'>
            <div className='space-y-8'>
                <img className='mx-auto max-w-[200px]' src={errorImg}></img>
                <h1 className='text-5xl text-black font-medium'>Oops! Page Not Found</h1>
                <div>
                    <Link to={'/'}><button className='button'>Go Back</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Error;