import { useLoaderData } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import location from '../../assets/icons/location.png'
import { toast } from 'react-toastify';
import useAxiosSecure from './../../hooks/useAxiosSecure';

const Offer = () => {

    const item = useLoaderData();
    const { property_image, property_title, property_location, agent_name, agent_image, price, property_status, description, agent_email, _id, propertyId } = item;
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const buyerEmail = form.buyerEmail.value;
        const buyerName = form.buyerName.value;
        const buyerBidAmount = form.buyerBid.value;
        if (buyerBidAmount < price) {
            toast.warn(`This Minimum Price is $${price}`);
            form.reset();
            return;
        }
        const status = 'pending'
        const bidData = {
            buyerEmail, buyerName, buyerBidAmount, property_image,
            property_location, property_status, agent_name, status, agent_email,
            propertyId, property_title, property_price: price, agent_image, property_status
        }
        try {
            const { data } = await axiosSecure.post('/offer', bidData)
            if (data.insertedId === null) {
                toast.error('You Already Submited Proposla for this Property');
                form.reset();
            }
            else {
                toast.success('Proposla Sent Successfull');
                form.reset();
            }
        }
        catch (error) {
            console.log(error.code)
        }
    }

    return (
        <div className="min-h-[calc(100vh-240px)] max-w-[1440px] mx-auto px-4 pt-14 flex items-center">
            <div className="w-full">
                <h1 className='text-3xl font-medium text-black mb-6'>Send A Proposal</h1>
                <div className="details-box">
                    <div className="flex items-center">
                        <img className="w-full rounded-md max-w-[695px]" src={property_image}></img>
                    </div>
                    <div className="flex items-center">
                        <div>
                            <p className="property_status">for {property_status}</p>
                            <div className="flex justify-between items-center my-3">
                                <h1 className="text-3xl font-medium text-black">{property_title}</h1>
                                <div className="flex items-center"><h1 className="text-xl font-medium">${price}</h1>/<p>{property_status === 'rent' ? 'month' : 'SqFT'}</p></div>
                            </div>
                            <p>{description}</p>
                            <div className="line my-5"></div>
                            <div className="flex justify-between items-center">
                                <div className="space-y-3">
                                    <p className="text-lg font-medium text-black uppercase">Seller:</p>
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-2"><img className="w-[35px] h-[35px] rounded-full" src={agent_image}></img><p className="font-medium">{agent_name}</p></div>

                                    </div>
                                </div>
                                <div className='space-y-3'>
                                    <p className="text-lg font-medium text-black uppercase">Location:</p>
                                    <div className="flex items-center gap-2"><img className='w-[20px]' src={location} /><p className="font-medium">{property_location}</p></div>
                                </div>
                            </div>
                            <div className="line my-5"></div>
                            <div>
                                <form className="proposal space-y-5" onSubmit={handleSubmit}>
                                    <div className="flex gap-6">
                                        <div className="w-full">
                                            <input className="w-full" type="text" name="buyerEmail" value={user?.email} disabled />
                                        </div>
                                        <div className="w-full">
                                            <input className="w-full" type="text" name="buyerName" value={user?.displayName} disabled />
                                        </div>
                                    </div>
                                    <div className="flex gap-6 items-center">
                                        <div className="w-full">
                                            <input className="w-full" type="number" name="buyerBid" placeholder="Type Your Price..." required />
                                        </div>
                                        <div className="w-full">
                                            <button>Send</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offer;