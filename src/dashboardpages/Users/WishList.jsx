import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import WishListCard from '../../components/WishListCard';


const WishList = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: wishLists = [] } = useQuery({
        queryKey: ['wishlist', user.email],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/wishlist/${user.email}`)
            return data;
        }
    })

    return (
        <div>
            <h1 className='text-3xl font-medium text-black mb-6'>My Wish List</h1>
            <div className='grid grid-cols-4 gap-6'>
                {
                    wishLists.map(item => <WishListCard key={item._id} item={item}></WishListCard>)
                }
            </div>
        </div>
    );
};

export default WishList;