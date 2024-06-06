import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Table } from "flowbite-react";
import location from '../../assets/icons/location.png'
import deleteIcon from '../../assets/icons/delete.png'
import editIcon from '../../assets/icons/valid.png'

const PropertyBought = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: propertyBought = [] } = useQuery({
        queryKey: ['propertyBought', user.email],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/offer/${user.email}`)
            return data;
        }
    })
    return (
        <div>
            <h1 className='text-3xl font-medium text-black mb-6'>My Properties</h1>
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
                                    <Table.Cell className="border-right text-center max-w-[0px]"><div className="bg-yellow-300 w-fit text-white mx-auto capitalize rounded px-2 py-[2px]">{item.status}</div></Table.Cell>
                                    <Table.Cell className="bg-red- max-w-[0px]">
                                        <div className="bg-blue- w-fit mx-auto space-y-4">
                                            <button className="flex items-center gap-2" disabled={item.status === 'pending'}><img src={editIcon}></img>Pay</button>
                                            <button className="flex items-center gap-2"><img src={deleteIcon}></img>Delete</button>
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