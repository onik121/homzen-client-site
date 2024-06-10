import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from 'react-toastify';
import { useQuery } from "@tanstack/react-query";

const CheckOutForm = ({ id }) => {

    const [price, setPrice] = useState(null);
    const [clientSecret, setClientSecret] = useState('')
    const [error, setError] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();


    const { data: propertyBought = [], isPending, refetch } = useQuery({
        queryKey: ['propertyBought'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/offer/id/${id.id}`)
            return data;
        }
    })

    useEffect(() => {
        if (!isPending) {
            setPrice(propertyBought.buyerBidAmount);
        }
    }, [isPending, propertyBought]);


    // payment
    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const res = await axiosSecure.post('/create-payment-intent', { price });
                setClientSecret(res.data.clientSecret);
            } catch (error) {
                console.error('Error creating payment intent:', error);
            }
        };

        if (price > 0) {
            createPaymentIntent();
        }
    }, [axiosSecure, price]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            // console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }


        // confirm payment 
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                }
            }
        })
        if (confirmError) {
            console.log('confirm error')
        }
        else {
            // console.log('payment intent', paymentIntent)
            if (paymentIntent.status == "succeeded") {
                toast.success('Payment Sucessfull')
                card.clear();
                refetch();
                navigate('/myproperties')

                // now update the status
                const stausData = {
                    status: 'bought',
                    propertyId: id.id,
                }
                await axiosSecure.patch(`/offer/payment-status/${id.id}`, stausData)

                // now save the payment in the database
                const paymentData = {
                    property_image: propertyBought.property_image,
                    property_title: propertyBought.property_title,
                    property_location: propertyBought.property_location,
                    buyer_email: user.email,
                    buyer_name: user.displayName,
                    sold_price: price,
                    created_at: new Date(),
                    transactionId: paymentIntent.id,
                    propertyId: propertyBought.propertyId,
                    agent_name: propertyBought.agent_name,
                    agent_email: propertyBought.agent_email,
                    status: 'sold',
                }
                const { data } = await axiosSecure.post('/sold-property', paymentData)
                console.log('payment data save', data);
            }
        }

    }

    return (
        <form className="space-y-8" onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="button" type="submit" disabled={!stripe || !price || !clientSecret}>Pay</button>
            <p className="text-red-100">{error}</p>
        </form>
    );
};

export default CheckOutForm;