import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useWishlist = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: wishLists = [], refetch } = useQuery({
        queryKey: ['wishlist', user.email],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/wishlist/${user.email}`)
            return data;
        }
    })

    return [wishLists, refetch]

};

export default useWishlist;