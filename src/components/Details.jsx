import { useLoaderData } from "react-router-dom";
import location from '../assets/location.png'
import bed from '../assets/icons/bed.png'
import garage from '../assets/icons/garages.png'
import propertyType from '../assets/icons/exchange.png'
import bath from '../assets/icons/bathtub.png'
import built from '../assets/icons/crane.png'
import land from '../assets/icons/land.png'
import landarea from '../assets/icons/ruler.png'
import love from '../assets/icons/heart.png'
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const Details = () => {


    const property = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { property_image, property_status, property_title, property_location, price, agent_image,
        agent_name, apartment_type, built_year, description, area, bedrooms, washrooms, garages, land_size, verification_status, _id } = property;
    const handleWishList = async () => {
        const wishListData = {
            propertyId: _id,
            email: user?.email,
            property_image,
            property_title,
            property_location,
            agent_name,
            agent_image,
            price,
            verification_status,
        }
        try {
            const { data } = await axiosSecure.post('/wishlist', wishListData)
            if (data.insertedId === null) {
                toast.warn('This item is already in your wishlist.');
            }
            else {
                toast.success('Item successfully added to your wishlist.');
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="min-h-[calc(100vh-240px)] max-w-[1440px] mx-auto px-4 flex items-center">
            <div className="details-box">
                <div className="flex items-center mb-4 relative">
                    <img className="w-full rounded-md relative max-w-[690px]" src={property_image}></img>
                    <button onClick={handleWishList} className="whish-list absolute left-3 top-5" title="Add to wishlist"><img className="w-[25px]" src={love}></img></button>
                </div>
                <div className="">
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
                    <div className="">
                        <p className="text-lg font-medium text-black uppercase mb-3">overview:</p>
                        <div className="property-overview flex flex-wrap justify-between">
                            <div className="flex items-center gap-3 w-1/4 mb-4">
                                <img className="w-[54px]" src={propertyType} alt="Property Type"></img>
                                <div className="space-y-1">
                                    <p>Type:</p>
                                    <p className="capitalize font-medium">{apartment_type}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 w-1/4 mb-4">
                                <img src={bed} alt="Bedrooms"></img>
                                <div className="space-y-1">
                                    <p>Bedrooms:</p>
                                    <p className="capitalize font-medium">{bedrooms} Rooms</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 w-1/4 mb-4">
                                <img src={bath} alt="Bathrooms"></img>
                                <div className="space-y-1">
                                    <p>Bathrooms:</p>
                                    <p className="capitalize font-medium">{washrooms} Rooms</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 w-1/4 mb-4">
                                <img src={garage} alt="Garages"></img>
                                <div className="space-y-1">
                                    <p>Garages:</p>
                                    <p className="capitalize font-medium">{garages} Rooms</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 w-1/4 mb-4">
                                <img src={landarea} alt="Size"></img>
                                <div className="space-y-1">
                                    <p>Size:</p>
                                    <p className="capitalize font-medium">{area} SqFT</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 w-1/4 mb-4">
                                <img src={land} alt="Land Size"></img>
                                <div className="space-y-1">
                                    <p>Land Size:</p>
                                    <p className="capitalize font-medium">{land_size} SqFT</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 w-1/4 mb-4">
                                <img src={built} alt="Year Built"></img>
                                <div className="space-y-1">
                                    <p>Year Built:</p>
                                    <p className="capitalize font-medium">{built_year}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 w-1/4 mb-4">
                                <img src={built} alt="Year Built"></img>
                                <div className="space-y-1">
                                    <p>Year Built:</p>
                                    <p className="capitalize font-medium">{built_year}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Details;