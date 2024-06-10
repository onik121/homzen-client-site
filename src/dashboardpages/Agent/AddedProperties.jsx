import { useQuery } from '@tanstack/react-query';
import useAuth from './../../hooks/useAuth';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AddedPropertiesCard from "../../components/AddedPropertiesCard";
import { Helmet } from 'react-helmet';
import { Scroll } from '../../components/Scroll';

const AddedProperties = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: addedProperties = [], isPending, isError, refetch} = useQuery({
        queryKey: [user?.email, 'userRole'],
        enabled: !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/properties/agent/${user.email}`);
            return data;
        }
    });

    const properties = Array.isArray(addedProperties) ? addedProperties : [];

    return (
        <div className='overflow-x-auto border-2 p-10'>
            <Scroll></Scroll>
            <Helmet>
                <title>Added Properties</title>
            </Helmet>
            <h1 className='text-3xl font-medium text-black mb-6'>My Added Properties</h1>
            {isPending && 'Loading...'}
            {!isPending && !isError && (
                <div className='grid grid-cols-4 gap-6 min-w-[1200px]'>
                    {properties.map(item => (
                        <AddedPropertiesCard key={item._id} item={item} refetch={refetch}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddedProperties;
