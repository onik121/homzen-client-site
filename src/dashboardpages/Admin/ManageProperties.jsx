import { Table } from 'flowbite-react';
import useProperties from '../../hooks/useProperties';
import locationIcon from '../../assets/icons/location.png'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageProperties = () => {


    const axiosSecure = useAxiosSecure();
    const { data: properties = [], refetch } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/properties/all')
            return data;
        }
    })


    const handleButtonClick = async (action, id) => {
        const titleText = action === 'verified' ? `Did you want to set this property as ${action}` : `Did you want to ${action} this property`;
        Swal.fire({
            title: titleText,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const updateData = {
                    action,
                    id
                };
                try {
                    const { data } = await axiosSecure.patch(`/property/verification-status/${id}`, updateData);
                    if (data.modifiedCount > 0) {
                        const titleText = action === 'verified' ? `${action} ` : `${action}`;
                        Swal.fire({
                            title: titleText,
                            icon: "success"
                        });
                        refetch();
                    }
                } catch (err) {
                    console.log(err);
                    toast.error('Operation failed');
                }
            }
        });
    };


    const getStatusClass = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-300 text-black';
            case 'reject':
                return 'bg-red-600 text-white';
            case 'verified':
                return 'bg-green-500 text-white';
            default:
                return '';
        }
    };


    return (
        <div className="overflow-x-auto border-2 p-8">
            <h1 className='text-3xl font-medium text-black mb-6'>Manage All Properties</h1>
            <div className="rounded-md border-2 mx-auto min-w-[1200px]">
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Property Details</Table.HeadCell>
                        <Table.HeadCell className="max-w-[80px] text-center">Agent</Table.HeadCell>
                        <Table.HeadCell className="max-w-[60px] text-center">Price</Table.HeadCell>
                        <Table.HeadCell className="max-w-[80px] text-center">Status</Table.HeadCell>
                        <Table.HeadCell className="max-w-[80px] text-center">Action</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            properties.map(item =>
                                <Table.Row className="bg-red- hi" key={item._id}>
                                    <Table.Cell className="whitespace-nowrap max-w-[180px] border-right">
                                        <div className="flex items-center gap-5">
                                            <img className="w-[200px] rounded-md" src={item.property_image} alt="Property"></img>
                                            <div className="space-y-4 text-black">
                                                <h2 className="text-xl font-medium">{item.property_title}</h2>
                                                <div className="flex items-center gap-1"><img className="w-5" src={locationIcon} alt="Location"></img><p>{item.property_location}</p></div>
                                                <div className="flex items-center">
                                                    <p className="text-lg font-medium">${item.price}</p>
                                                    <p>{item.property_status === 'rent' ? '/month' : '/SqFT'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="border-right max-w-[110px]">
                                        <div className="w-fit mx-auto gap-3 flex items-center">
                                            <div>
                                                <img className='rounded-full w-[40px]' src={item.agent_image}></img>
                                            </div>
                                            <div>
                                                <p>Email: {item.agent_email}</p>
                                                <p>Name: {item.agent_name}</p>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="border-right text-center max-w-[0px]"><p>${item.price}</p></Table.Cell>
                                    <Table.Cell className="text-center max-w-[0px] border-right">
                                        <div className={`w-fit mx-auto capitalize rounded px-2 py-[2px] ${getStatusClass(item.verification_status)}`}>
                                            {item.verification_status}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="max-w-[0px] space-y-5">
                                        {
                                            item.verification_status === 'pending' && <>
                                                <div className="bg-green-600 w-fit text-white mx-auto capitalize rounded px-2 py-[2px]"><button onClick={() => handleButtonClick('verified', item._id)}>Verify</button></div>
                                                <div className="bg-red-600 w-fit text-white mx-auto capitalize rounded px-2 py-[2px]"> <button onClick={() => handleButtonClick('reject', item._id)}>Reject</button></div>
                                            </>
                                        }
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

export default ManageProperties;