import { Scroll } from './../../components/Scroll';

const AdminProfile = () => {
    return (
        <div className="overflow-x-auto border-2 p-8">
            <Scroll></Scroll>
            <h1 className='text-3xl font-medium text-black mb-6'>Admin Profile</h1>
        </div>
    );
};

export default AdminProfile;