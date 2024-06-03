import { NavLink } from 'react-router-dom';
import location from '../assets/location.png'

const PropertyCard = ({ item }) => {

    const { property_image, property_title, property_location, agent_name, agent_image, price, property_status, verification_status, _id } = item;

    return (
        <NavLink to={`/details/${_id}`}>
            <div>
                <div className="relative">
                    <img src={property_image}></img>
                    <p className="absolute top-3 status left-3 uppercase px-2 py-1 text-sm font-medium">for {property_status}</p>
                </div>
                <div className="border-1">
                    <div className="px-5 py-4">
                        <div className='flex gap-3 items-center'><h1 className="text-2xl mb-3 text-black font-medium">{property_title}</h1>
                            <p className='capitalize'>{verification_status === 'verified' ? <p className='verified'>verified</p> : <p className='verification_status'>Not verified</p>}</p>
                        </div>
                        <div className='flex items-center gap-2'><img className='w-[20px]' src={location} /><p>{property_location}</p></div>
                    </div>
                    <div className="line"></div>
                    <div className="px-5 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <img className='w-[35px] h-[35px] rounded-full' src={agent_image}></img>
                            <p>{agent_name}</p>
                        </div>
                        <div className="flex items-center"> <p className="text-xl font-medium">${price}</p>/<p>{property_status === 'rent' ? 'month' : 'SqFT'}</p></div>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export default PropertyCard;