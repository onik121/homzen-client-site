import del from '../assets/icons/delete.png';
import location from '../assets/icons/location.png';
import editIcon from '../assets/icons/editing.png'
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const AddedPropertiesCard = ({ item, refetch }) => {

    const axiosSecure = useAxiosSecure();
    const { property_image, property_title, property_location, agent_name, agent_image, price, property_status, verification_status, _id } = item;

    const handleDelete = (id) => {
        Swal.fire({
            title: "Did you want to delete it?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                console.log(id)
                const { data } = await axiosSecure.delete(`/properties/${id}`)
                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted Successfully",
                        icon: "success"
                    });
                    refetch();
                }
            }
        });
    }

    const getStatusClass = (status) => {
        switch (status) {
            case 'verified':
                return 'bg-green-500 text-white';
            case 'pending':
                return 'bg-yellow-400 text-white';
            case 'reject':
                return 'bg-red-500 text-white';
            default:
                return '';
        }
    };

    return (
        <div className="border-2 overflow-hidden h-full flex flex-col">
            <img src={property_image} className="w-full h-48 object-cover" alt="Property" />
            <div className="flex flex-col justify-between flex-grow">
                <div className="px-3 py-4">
                    <div className="flex gap-5 justify-between">
                        <h1 className="text-2xl mb-3 text-black font-medium p-0">{property_title}</h1>
                        <p className={`capitalize px-2 py-[2px] text-[14px] rounded h-fit mt-2 ${getStatusClass(verification_status)}`}>{verification_status}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <img className="w-5" src={location} alt="Location" />
                        <p>{property_location}</p>
                    </div>
                </div>
                <div className="line"></div>
                <div className="px-3 py-4 flex items-center justify-between">
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
                <div className="px-3 py-4 flex justify-between">
                    <Link to={`edit/${_id}`}><img src={editIcon} alt="Delete" /></Link>
                    <button onClick={() => handleDelete(_id)}><img src={del} alt="Delete" /></button>
                </div>
            </div>
        </div>
    );
};

export default AddedPropertiesCard;
