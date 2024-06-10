import { useQuery } from '@tanstack/react-query';
import WishListCard from '../../components/WishListCard';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet';

const WishList = () => {


    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: wishLists = [], refetch, isPending:dataLoading } = useQuery({
        queryKey: ['wishlist', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/wishlist/${user?.email}`)
            return data;
        }
    })

    return (
        <div className='min-h-[calc(100vh-240px)] max-w-[1440px] mx-auto px-4 pt-20 pb-12'>
            <Helmet>
                <title>Homzen | My Wishlist</title>
            </Helmet>
            {
                dataLoading ? 'loading' : <div>
                <h1 className='text-3xl font-medium text-black mb-6'>My Wishlist</h1>
                <div className='grid grid-cols-2 gap-6'>
                    {
                        wishLists.map(item => (
                            <WishListCard key={item._id} item={item} refetch={refetch}/>
                        ))
                    }
                </div>
            </div>
            }
        </div>
    );
};

export default WishList;
