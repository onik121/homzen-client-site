import WishListCard from '../../components/WishListCard';
import useWishlist from '../../hooks/useWishlist';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const WishList = () => {
    const [wishLists, , dataLoading] = useWishlist();

    return (
        <div className='min-h-[calc(100vh-240px)] max-w-[1440px] mx-auto px-4 pt-20 pb-12'>
            {
                dataLoading ? 'loading' : <div>
                <h1 className='text-3xl font-medium text-black mb-6'>My Wishlist</h1>
                <div className='grid grid-cols-2 gap-6'>
                    {
                        wishLists.map(item => (
                            <WishListCard key={item._id} item={item} />
                        ))
                    }
                </div>
            </div>
            }
        </div>
    );
};

export default WishList;
