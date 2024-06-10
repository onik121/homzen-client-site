import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import deleteIcon from '../../assets/icons/delete.png'
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { Scroll } from '../../components/Scroll';

const MyReviews = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: reviews = [], refetch } = useQuery({
        queryKey: [user?.email, 'reviews'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/reviews/email/${user.email}`);
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
                console.log(id)
                const { data } = await axiosSecure.delete(`/reviews/${id}`)
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
        <div className='min-h-[calc(100vh-240px)] max-w-[1440px] mx-auto px-4 pt-20 pb-12 flex items-center'>
            <Scroll></Scroll>
            <Helmet>
                <title>Homzen | My Reviews</title>
            </Helmet>
            <div>
                <h1 className='text-3xl font-medium text-black mb-6'>My Reviews</h1>
                <div className='grid grid-cols-3 gap-6'>
                    {
                        reviews.map(item => (
                            <div className='border-2 p-4 min-h-[230px]'>
                                <div className='space-y-5 min-h-full'>
                                    <h1 className='text-3xl font-medium text-black'>{item.property_title}</h1>
                                    <p className='text-lg'>{item.review_description}</p>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-3'>
                                            <img className='w-[35px] rounded-full' src={item.reviewer_image}></img>
                                            <p>{item.reviewer_name}</p>
                                        </div>
                                        <button onClick={() => handleDelete(item._id)}><img src={deleteIcon}></img></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default MyReviews;