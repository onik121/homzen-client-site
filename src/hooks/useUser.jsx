import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUser = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
 
    const { data: users = [], isPending} = useQuery({
        queryKey: [user?.email, 'users'],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/${user?.email}`);
            return data;
        }
    })

    return [users, isPending]
};

export default useUser;