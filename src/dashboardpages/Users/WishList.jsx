import WishListCard from '../../components/WishListCard';
import useWishlist from '../../hooks/useWishlist';


const WishList = () => {

    const [wishLists] = useWishlist();

    return (
        <div>
            <h1 className='text-3xl font-medium text-black mb-6'>My Wishlist</h1>
            <div className='grid grid-cols-2 gap-6'>
                {
                    wishLists.map(item => <WishListCard key={item._id} item={item}></WishListCard>)
                }
            </div>
        </div>
    );
};

export default WishList;