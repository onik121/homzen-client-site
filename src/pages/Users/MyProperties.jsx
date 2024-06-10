import { Table } from 'flowbite-react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import location from '../../assets/icons/location.png'

const MyProperties = () => {


    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: myProperties = [], refetch } = useQuery({
        queryKey: ['requested'],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/sold-property/user/${user.email}`);
            return data;
        }
    });

    return (
        <div className="min-h-[calc(100vh-240px)] max-w-[1440px] mx-auto px-4 pt-20 pb-12">
            <h1 className='text-3xl font-medium text-black mb-6'>My Properties</h1>
            <div className="">
                <Table className="border-2">
                    <Table.Head >
                        <Table.HeadCell>Property Details</Table.HeadCell>
                        <Table.HeadCell className="max-w-[80px] text-center">Agent</Table.HeadCell>
                        <Table.HeadCell className="max-w-[80px] text-center">price</Table.HeadCell>
                        <Table.HeadCell className="max-w-[80px] text-center">Status</Table.HeadCell>
                        <Table.HeadCell className="max-w-[80px] text-center">transaction Id</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            myProperties.map(item =>
                                <Table.Row className="bg-red- hi" key={item._id}>
                                    <Table.Cell className="whitespace-nowrap max-w-[180px] border-right">
                                        <div className="flex items-center gap-5">
                                            <img className="w-[200px] rounded-md" src={item.property_image}></img>
                                            <div className="space-y-4 text-black">
                                                <h2 className="text-2xl font-medium">{item.property_title}</h2>
                                                <div className="flex items-center gap-1"><img className="w-5" src={location}></img><p>{item.property_location}</p></div>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="border-right bg-blue- max-w-[0px]">
                                        <div className="flex items-center w-fit mx-auto gap-3 bg-red-">
                                            <img className="w-[40px] rounded-full" src={item.agent_image}></img>
                                            <p>{item.agent_name}</p>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="border-right text-center bg-red- max-w-[0px]"><p>${item.sold_price}</p></Table.Cell>
                                    <Table.Cell className="border-right text-center max-w-[0px]">
                                        <div className="w-fit mx-auto bg-green-500 text-white px-2 py-[2px] rounded">
                                            <p>Paid</p>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="max-w-[100px]">
                                        <div className="w-fit mx-auto space-y-4">
                                            <p>{item.transactionId}</p>                                            
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

export default MyProperties;