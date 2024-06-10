import { Scroll } from "../../components/Scroll";
import useUser from "../../hooks/useUser";


const AgentProfile = () => {

    const [users] = useUser()

    return (
        <div className="overflow-x-auto border-2 p-8">
            <Scroll></Scroll>
            <h1 className='text-3xl font-medium text-black mb-6'>Profile</h1>
            <div className="flex items-center gap-5  border-2 w-fit p-5">
                <img className="rounded-full" src={users.image}></img>
                <div className="space-y-1">
                    <p className="text-lg text-black font-medium">Name: {users.name}</p>
                    <p className="text-lg text-black font-medium capitalize">Role: {users.role}</p>
                </div>
            </div>
        </div>
    );
};

export default AgentProfile;