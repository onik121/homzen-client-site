import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Table } from "flowbite-react";
import locationIcon from '../../assets/icons/location.png'

const SoldProperties = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: soldProperties = [], refetch, isPending } = useQuery({
        queryKey: ['requested'],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/sold-property/agent/${user.email}`);
            return data;
        }
    });

    return (
        <div className="overflow-x-auto border-2 p-10">
            <h1 className='text-3xl font-medium text-black mb-6'>Sold Properties</h1>
            {isPending && 'Loading...'}
            {!isPending && <div className="rounded-md border-2 mx-auto min-w-[1200px]">
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Property Details</Table.HeadCell>
                        <Table.HeadCell className="max-w-[80px] text-center">Buyer</Table.HeadCell>
                        <Table.HeadCell className="max-w-[60px] text-center">Sold Price</Table.HeadCell>
                        <Table.HeadCell className="max-w-[80px] text-center">Status</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            soldProperties.map(item =>
                                <Table.Row className="bg-red- hi" key={item._id}>
                                    <Table.Cell className="whitespace-nowrap max-w-[180px] border-right">
                                        <div className="flex items-center gap-5">
                                            <img className="w-[200px] rounded-md" src={item.property_image} alt="Property"></img>
                                            <div className="space-y-4 text-black">
                                                <h2 className="text-2xl font-medium">{item.property_title}</h2>
                                                <div className="flex items-center gap-1"><img className="w-5" src={locationIcon} alt="Location"></img><p>{item.property_location}</p></div>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="border-right max-w-[0px]">
                                        <div className="w-fit mx-auto gap-3 space-y-2">
                                            <p>Email: {item.buyer_email}</p>
                                            <p>Name: {item.buyer_name}</p>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="border-right text-center max-w-[0px]"><p>${item.sold_price}</p></Table.Cell>
                                    <Table.Cell className="max-w-[0px] space-y-5">
                                        <div className="w-fit mx-auto bg-green-500 text-white px-2 py-[2px] rounded">
                                            <p className="capitalize">{item.status}</p>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        }
                    </Table.Body>
                </Table>
            </div>}
        </div>
    );
};

export default SoldProperties;