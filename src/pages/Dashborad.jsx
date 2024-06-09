import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import closeIcon from '../assets/icons/left-chevron.png';
import profileIcon from '../assets/icons/user.png';
import reviewIcon from '../assets/icons/rating.png';
import usersIcon from '../assets/icons/group.png';
import backIcon from '../assets/icons/return.png';
import houseIcon from '../assets/icons/house.png';
import useRole from "../hooks/useRole";
import logo from '../assets/logo2.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Dashboard = () => {
    const [open, setOpen] = useState(true);
    const [userRole, isAdminLoading] = useRole();

    const toggleSidebar = () => setOpen(!open);

    const renderMenuItems = (role) => {
        const adminItems = [
            { to: '/dashboard/adminProfile', icon: profileIcon, label: 'Profile' },
            { to: '/', icon: houseIcon, label: 'Manage Properties' },
            { to: '/dashboard/manageusers', icon: usersIcon, label: 'Manage Users' },
            { to: '/dashboard/managereviews', icon: reviewIcon, label: 'Manage Reviews' },
            { to: '/', icon: backIcon, label: 'Go Back' },
        ];

        const agentItems = [
            { to: '/dashboard/agentProfile', icon: profileIcon, label: 'Agent Profile' },
            { to: '/dashboard/addproperty', icon: houseIcon, label: 'Add Property' },
            { to: '/dashboard/addedproperties', icon: usersIcon, label: 'Added Properties' },
            { to: '/', icon: reviewIcon, label: 'Sold Properties' },
            { to: '/dashboard/requestedproperties', icon: usersIcon, label: 'Offred Properties' },
            { to: '/', icon: backIcon, label: 'Go Back' },
        ];

        const items = role === 'admin' ? adminItems : agentItems;

        return items.map((item) => (
            <NavLink key={item.to} to={item.to}>
                <li className={`flex items-center gap-3 ${!open && "justify-center"}`}>
                    <img src={item.icon} alt={`${item.label} icon`} />
                    <p className={`${!open && "hidden"} origin-left duration-200 font-medium`}>{item.label}</p>
                </li>
            </NavLink>
        ));
    };

    const skeletonCount = userRole === 'admin' ? 5 : 6;

    return (
        <div className="flex h-full relative ">
            <div className={`${open ? "w-72" : "w-24"} relative duration-300 py-8 min-h-screen z-50 bg-[#f2f2f2]`}>
                <div className={`${open ? "w-72" : "w-24"} fixed duration-300 px-5 relative`}>
                    <img
                        src={closeIcon}
                        alt="Toggle sidebar"
                        className={`absolute cursor-pointer -right-5 top-5 ${!open && "rotate-180"} open-close`}
                        onClick={toggleSidebar}
                    />
                    <div className="flex gap-x-3 items-center">
                        <img className="max-w-[40px]" src={logo} alt="Logo" />
                        <h1 className={`text-black font-medium text-2xl duration-200 ${!open && "scale-0"}`}>Homzen</h1>
                    </div>
                    {isAdminLoading ? (
                        <ul className="mt-8 dashboard-menu">
                            <Skeleton className="dashboard-skeleton" count={skeletonCount} height={42} />
                        </ul>
                    ) : (
                        <ul className="mt-10 dashboard-menu">
                            {renderMenuItems(userRole)}
                        </ul>
                    )}
                </div>
            </div>
            <div className="h-full flex-1 m-14 overflow-hidden">
                <div className="overflow-hidden">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
