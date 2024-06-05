import React from 'react';
import del from '../assets/icons/delete.png'
import offer from '../assets/icons/offer.png'
import location from '../assets/icons/location.png'

const WishListCard = ({ item }) => {
    const { property_image, property_title, property_location, agent_name, agent_image, price, property_status, verification_status } = item;

    return (
        <div className="border-2 overflow-hidden h-full flex flex-col">
            <img src={property_image} className="w-full h-48 object-cover" alt="Property" />
            <div className="flex flex-col justify-between flex-grow">
                <div className="px-5 py-4">
                    <div className="flex gap-3 items-center">
                        <h1 className="text-2xl mb-3 text-black font-medium">{property_title}</h1>
                        <p className='capitalize'>{verification_status === 'verified' ? <p className='verified'>verified</p> : <p className='verification_status'>Not verified</p>}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <img className="w-5" src={location} alt="Location" />
                        <p>{property_location}</p>
                    </div>
                </div>
                <div className="line"></div>
                <div className="px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img className="w-9 h-9 rounded-full" src={agent_image} alt="Agent" />
                        <p>{agent_name}</p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-xl font-medium">${price}</p>
                        <p>{property_status === 'rent' ? '/month' : '/SqFT'}</p>
                    </div>
                </div>
                <div className="line"></div>
                <div className="px-5 py-4 flex justify-between">
                    <button><img src={offer}></img></button>
                    <button><img src={del}></img></button>
                </div>
            </div>
        </div>
    );
};

export default WishListCard;
