import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useRole = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: userRole = [] } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/role/${user?.email}`)
            return data?.role;
        }
    })

    return [userRole]
};

export default useRole;