import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useRole = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: userRole = [], isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'userRole'],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/role/${user.email}`);
            return data.role;
        }
    })

    return [userRole]
};

export default useRole;