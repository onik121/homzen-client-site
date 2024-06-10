import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT);

const Payment = () => {

    const parms = useParams()
    
    return (
        <div className='min-h-[calc(100vh-240px)] max-w-[1440px] mx-auto px-4 pt-20 pb-12 flex items-center'>
            <div className='w-full border-2 p-5 max-w-[600px] mx-auto'>
                <h1 className='text-3xl font-medium text-black mb-6'>Make Your Payment</h1>
                <Elements stripe={stripePromise}>
                    <CheckOutForm id={parms}></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;