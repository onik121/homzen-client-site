import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Table } from "flowbite-react";
import location from '../../assets/icons/location.png'
import deleteIcon from '../../assets/icons/delete.png'
import editIcon from '../../assets/icons/valid.png'
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from 'react-helmet';
import { Scroll } from "../../components/Scroll";

const PropertyBought = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: propertyBought = [], refetch, isPending } = useQuery({
        queryKey: ['propertyBought', user.email],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/offer/${user.email}`)
            return data;
        }
    })

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
                const { data } = await axiosSecure.delete(`/offer/${id}`)
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
            case 'pending':
                return 'bg-yellow-300 text-black';
            case 'reject':
                return 'bg-red-600 text-white';
            case 'accept':
                return 'bg-green-500 text-white';
            case 'bought':
                return 'bg-green-500 text-white';
            default:
                return '';
        }
    };

    return (
        <div className="min-h-[calc(100vh-240px)] max-w-[1440px] mx-auto px-4 pt-20 pb-12">
            <Scroll></Scroll>
            <Helmet>
                <title>Homzen | My Request</title>
            </Helmet>
            <h1 className='text-3xl font-medium text-black mb-6'>My Requested Properties</h1>
            <div className="">
                <Table className="border-2">
                    <Table.Head >
                        <Table.HeadCell>Property Details</Table.HeadCell>
                        <Table.HeadCell className="max-w-[80px] text-center">Agent</Table.HeadCell>
                        <Table.HeadCell className="max-w-[80px] text-center">Offred</Table.HeadCell>
                        <Table.HeadCell className="max-w-[80px] text-center">Status</Table.HeadCell>
                        <Table.HeadCell className="max-w-[80px] text-center">Action</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            propertyBought.map(item =>
                                <Table.Row className="bg-red- hi" key={item._id}>
                                    <Table.Cell className="whitespace-nowrap max-w-[180px] border-right">
                                        <div className="flex items-center gap-5">
                                            <img className="w-[200px] rounded-md" src={item.property_image}></img>
                                            <div className="space-y-4 text-black">
                                                <h2 className="text-xl font-medium">{item.property_title}</h2>
                                                <div className="flex items-center gap-1"><img className="w-5" src={location}></img><p>{item.property_location}</p></div>
                                                <div className="flex items-center">
                                                    <p className="text-lg font-medium">${item.property_price}</p>
                                                    <p>{item.property_status === 'rent' ? '/month' : '/SqFT'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="border-right bg-blue- max-w-[0px]">
                                        <div className="flex items-center w-fit mx-auto gap-3 bg-red-">
                                            <img className="w-[45px] rounded-full" src={item.agent_image}></img>
                                            <p>{item.agent_name}</p>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="border-right text-center bg-red- max-w-[0px]"><p>${item.buyerBidAmount}</p></Table.Cell>
                                    <Table.Cell className="border-right text-center max-w-[0px]">
                                        <div className={`w-fit mx-auto capitalize rounded px-2 py-[2px] ${getStatusClass(item.status)}`}>
                                            {item.status}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="bg-red- max-w-[0px]">
                                        <div className="bg-blue- w-fit mx-auto space-y-4">
                                            {item.status == 'accept' && <Link to={`/payment/${item._id}`}><button className="flex items-center gap-2" disabled={item.status === 'pending'}><img src={editIcon}></img>Pay</button></Link>}
                                            {item.status !== 'accept' && item.status !== 'bought' && <button className="flex items-center gap-2" onClick={() => handleDelete(item._id)}><img src={deleteIcon}></img>Delete</button>}
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        }
                    </Table.Body>
                </Table>

            </div>
        </div>
    );
};

export default PropertyBought;