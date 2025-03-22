import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Table } from "flowbite-react";
import deleteIcon from '../../assets/icons/delete.png'
import Swal from "sweetalert2";
import { Helmet } from 'react-helmet';
import { Scroll } from "../../components/Scroll";
import ReactPaginate from 'react-paginate';
import { useState } from "react";


const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();
    // pagination
    const [page, setPage] = useState(1);
    const limit = 10; // Change as needed

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['users', page],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/admin?page=${page}&limit=${limit}`);
            return data;
        }
    });
    
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-2xl font-semibold">Loading...</p>
            </div>
        );
    }
    
    
    const users = data?.users || [];
    const pageCount = data?.totalPages || 1;
    
    const handlePageClick = ({ selected }) => {
        setPage(selected + 1);
    };
    // pagination

    const handleButtonClick = async (action, id, email) => {
        Swal.fire({
            title: `Did you want to set this user as ${action}`,
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
                    id,
                    email,
                };
                console.log(updateData)
                try {
                    const { data } = await axiosSecure.patch(`/user/status/${id}`, updateData);
                    refetch();
                    console.log(data);
                } catch (err) {
                    console.log(err);
                    toast.error('Operation failed');
                }
            }
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Did you want to delete this user?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.delete(`/user/${id}`)
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

    return (
        <div className="overflow-x-auto border-2 p-8">
            <Scroll></Scroll>
            <Helmet>
                <title>Manage Users</title>
            </Helmet>
            <h1 className='text-3xl font-medium text-black mb-6'>Manage All Users</h1>
            <div className="min-w-[1200px]">
                <Table className="border-2">
                    <Table.Head >
                        <Table.HeadCell className="max-w-[80px]">Name</Table.HeadCell>
                        <Table.HeadCell className="max-w-[80px]">Email</Table.HeadCell>
                        <Table.HeadCell className="max-w-[80px] text-center">Current Staus</Table.HeadCell>
                        <Table.HeadCell className="max-w-[80px] text-center">Set Admin</Table.HeadCell>
                        <Table.HeadCell className="max-w-[80px] text-center">Set Agent</Table.HeadCell>
                        <Table.HeadCell className="max-w-[80px] text-center">Set Fraud</Table.HeadCell>
                        <Table.HeadCell className="max-w-[80px] text-center">Delete</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            users.map(item =>
                                <Table.Row className="" key={item._id}>
                                    <Table.Cell className="border-right max-w-[100px]">
                                        <p className="w-fit">{item.name}</p>
                                    </Table.Cell>
                                    <Table.Cell className="border-right max-w-[140px]">
                                        <p>{item.email}</p>
                                    </Table.Cell>
                                    <Table.Cell className="border-right max-w-[0px]">
                                        <p className="w-fit mx-auto capitalize">{item.role}</p>
                                    </Table.Cell>
                                    <Table.Cell className="border-right text-center max-w-[0px]">
                                        {
                                            item.role !== 'fraud' && <div className="mx-auto w-fit"><button className="role-button admin" onClick={() => handleButtonClick('admin', item._id, item.email)}>Admin</button></div>
                                        }
                                    </Table.Cell>
                                    <Table.Cell className="border-right text-center max-w-[0px]">
                                        {
                                            item.role !== 'fraud' && <div className="mx-auto w-fit"><button className="role-button agent" onClick={() => handleButtonClick('agent', item._id, item.email)}>Agent</button></div>
                                        }
                                    </Table.Cell>
                                    <Table.Cell className="border-right max-w-[0px]">
                                        {
                                            item.role === 'agent' && <div className="mx-auto w-fit"><button className="role-button fraud" onClick={() => handleButtonClick('fraud', item._id, item.email)}>Fraud</button></div>
                                        }
                                    </Table.Cell>
                                    <Table.Cell className="max-w-[0px]">
                                        <div className="mx-auto w-fit"><button onClick={() => handleDelete(item._id)}><img src={deleteIcon}></img></button></div>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        }
                    </Table.Body>
                </Table>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="Previous"
                    marginPagesDisplayed={2}
                    containerClassName="flex justify-center items-center gap-2 mt-4"
                    pageLinkClassName="px-4 py-2 border border-gray-300 rounded transition-all duration-300 hover:bg-red-600 hover:text-white"
                    previousLinkClassName="px-4 py-2 border border-gray-300 rounded transition-all duration-300 hover:bg-red-600 hover:text-white"
                    nextLinkClassName="px-4 py-2 border border-gray-300 rounded transition-all duration-300 hover:bg-red-600 hover:text-white"
                    activeClassName="py-[7px] bg-red-600 text-white rounded"
                />
            </div>
        </div>
    );
};

export default ManageUsers;