import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Table } from "flowbite-react";
import location from '../../assets/icons/location.png';
import { Helmet } from "react-helmet";
import { Scroll } from "../../components/Scroll";
import del from '../../assets/icons/delete.png';

const RequestedProperties = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: requested = [], refetch, isPending } = useQuery({
        queryKey: ['requested'],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/offer/agent/${user.email}`);
            return data;
        }
    });

    const handleButtonClick = async (action, id, propertyId) => {
        const updateData = {
            action,
            id,
            propertyId,
        };
        try {
            await axiosSecure.patch(`/offer/status/${id}`, updateData);
            refetch();
        } catch (err) {
            console.log(err);
            toast.error('Operation failed');
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-300 text-black';
            case 'reject':
                return 'bg-red-600 text-white';
            case 'accept':
                return 'bg-green-500 text-white';
            default:
                return '';
        }
    };

    const hasPendingItems = requested.some(item => item.status === 'pending');

    return (
        <div className="overflow-x-auto border-2 p-10">
            <Scroll></Scroll>
            <Helmet>
                <title>Requested Properties</title>
            </Helmet>
            <h1 className='text-3xl font-medium text-black mb-6'>Requested Properties</h1>
            {isPending && 'Loading...'}
            {!isPending && <div className="rounded-md border-2 mx-auto min-w-[1200px]">
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Property Details</Table.HeadCell>
                        <Table.HeadCell className="max-w-[80px] text-center">Buyer</Table.HeadCell>
                        <Table.HeadCell className="max-w-[60px] text-center">Offered</Table.HeadCell>
                        <Table.HeadCell className="max-w-[80px] text-center">Status</Table.HeadCell>
                        <Table.HeadCell className="max-w-[80px] text-center">Action</Table.HeadCell>
                        {/* {hasPendingItems && (
                            <Table.HeadCell className="max-w-[80px] text-center">Action</Table.HeadCell>
                        )} */}
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            requested.map(item =>
                                <Table.Row className="bg-red- hi" key={item._id}>
                                    <Table.Cell className="whitespace-nowrap border-right">
                                        <div className="flex items-center gap-5 max-w-fit">
                                            <img className="w-[200px] rounded-md" src={item.property_image} alt="Property"></img>
                                            <div className="space-y-4 text-black">
                                                <h2 className="text-xl font-medium">{item.property_title}</h2>
                                                <div className="flex items-center gap-1"><img className="w-5" src={location} alt="Location"></img><p>{item.property_location}</p></div>
                                                <div className="flex items-center">
                                                    <p className="text-lg font-medium">${item.property_price}</p>
                                                    <p>{item.property_status === 'rent' ? '/month' : '/SqFT'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="border-right max-w-fit">
                                        <div className="max-w-fit">
                                            <p>Email: {item.buyerEmail}</p>
                                            <p>Name: {item.buyerName}</p>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="border-right text-center"><p>${item.buyerBidAmount}</p></Table.Cell>
                                    <Table.Cell className="text-center border-right">
                                        <div className={`w-fit mx-auto capitalize rounded px-2 py-[2px] ${getStatusClass(item.status)}`}>
                                            {item.status}
                                        </div>
                                    </Table.Cell>
                                    {item.status === 'pending' && (
                                        <Table.Cell className="space-y-5">
                                            <div className="bg-green-600 w-fit text-white mx-auto capitalize rounded px-2 py-[2px]"><button onClick={() => handleButtonClick('accept', item._id, item.propertyId)}>Accept</button></div>
                                            <div className="bg-red-600 w-fit text-white mx-auto capitalize rounded px-2 py-[2px]"> <button onClick={() => handleButtonClick('reject', item._id, item.propertyId)}>Reject</button></div>
                                        </Table.Cell>
                                    )}
                                    {item.status === 'reject' && (
                                        <Table.Cell className="space-y-5">
                                            <div className="w-fit mx-auto"><button onClick={() => handleDelete(item._id)}><img src={del}/></button></div>
                                        </Table.Cell>
                                    )}
                                </Table.Row>
                            )
                        }
                    </Table.Body>
                </Table>
            </div>}
        </div>
    );
};

export default RequestedProperties;
