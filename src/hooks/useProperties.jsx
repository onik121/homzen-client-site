import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useProperties = () => {
    const axiosSecure = useAxiosSecure();
    const { data: properties = [] } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/properties')
            return data;
        }
    })
    return [properties]
};

export default useProperties;