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
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Modal } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from 'react-helmet';
import { Scroll } from "./Scroll";

const Details = () => {

    const [openModal, setOpenModal] = useState(false);
    const { property, reviews } = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { property_image, property_status, property_title, property_location, price, agent_image,
        agent_name, apartment_type, built_year, description, area, bedrooms, washrooms, garages, land_size, verification_status, _id, agent_email } = property;
    const handleWishList = async () => {
        const wishListData = {
            propertyId: _id, email: user?.email, property_image, property_title,
            property_location, agent_name, agent_image, price, verification_status,
            description, property_status, agent_email, created_at: new Date(),
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

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const reviewData = {
            reviewer_image: user.photoURL,
            reviewer_email: user.email,
            reviewer_name: user.displayName,
            review_description: data.review,
            property_title: property_title,
            propertyId: _id,
            created_at: new Date(),
        }
        // console.log(reviewData)
        try {
            const response = await axiosSecure.post('/reviews', reviewData)
            if (response.data.insertedId) {
                toast.success('Review Added Successfully');
                reset();
                setOpenModal(false);
            }
        }
        catch (error) {
            console.log(error.code)
            toast.error(`Error: ${error.code}`);
        }
    }

    return (
        <div className="min-h-[calc(100vh-240px)] max-w-[1440px] mx-auto px-4 pt-32 pb-[72px]">
            <Scroll></Scroll>
            <Helmet>
                <title>Homzen | Details</title>
            </Helmet>
            <div className="details-box">
                <div className="flex items-center mb-4 relative">
                    <img className="w-full h-full rounded-md max-w-[690px]" src={property_image}></img>
                    <button onClick={handleWishList} className="whish-list absolute top-3 left-3" title="Add to wishlist"><img className="w-[25px]" src={love}></img></button>
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
            <Swiper className="mt-10" modules={[Navigation, Pagination, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                navigation>
                {
                    reviews.slice(0, 6).map(item => <SwiperSlide key={item._id}>
                        <div className='border-2 p-4 min-h-[230px]'>
                            <div className='space-y-5 min-h-full'>
                                <h1 className='text-3xl font-medium text-black'>{item.property_title}</h1>
                                <p className='text-lg'>{item.review_description}</p>
                                <div className='flex items-center gap-3'>
                                    <img className='w-[35px] rounded-full' src={item.reviewer_image}></img>
                                    <p>{item.reviewer_name}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
            {/* modal */}
            <div className="flex items-center justify-center mt-10">
                <button className="button" onClick={() => setOpenModal(true)}>Add A Review</button>
            </div>
            <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
                <Modal.Header />
                <Modal.Body>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <textarea className="min-h-[150px]" placeholder="Write Your Review Here..." {...register("review", { required: true })}></textarea>
                            {errors.review && <span className='text-red-600'>Please Write Your Review</span>}
                            <div className="mt-5">
                                <button className="button">Submit</button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Details;