import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import close from '../assets/icons/left-chevron.png'
import profile from '../assets/icons/user.png'
import review from '../assets/icons/rating.png'
import users from '../assets/icons/group.png'
import back from '../assets/icons/return.png'
import house from '../assets/icons/house.png'
import useRole from "../hooks/useRole";
import logo from '../assets/logo2.png'
import wishlist from '../assets/icons/wish-list.png'

const Dashborad = () => {

    const [open, setOpen] = useState(true);
    const [userRole] = useRole();

    return (
        <div className="flex h-fit relative">

            <div className={` ${open ? "w-72" : "w-24 "} relative duration-300 dasboard py-8 min-h-screen`}>
                <div className={` ${open ? "w-[288px]" : "w-24"} fixed duration-300 px-5`}>
                    <img src={close} className={`absolute cursor-pointer -right-5 top-5 ${!open && "rotate-180"} open-close`} onClick={() => setOpen(!open)} />
                    <div className="flex gap-x-3 items-center">
                        <img className="max-w-[40px]" src={logo} />
                        <h1 className={`text-black font-medium text-2xl duration-200 ${!open && "scale-0"}`}>Homzen</h1>
                    </div>
                    {
                        userRole == 'none' && <ul className="mt-10 dashboard-menu">
                            <NavLink to={'/dashboard/wishList'}>
                                <li className={`flex items-center gap-3 ${!open && "justify-center"}`}>
                                    <img src={wishlist}></img>
                                    <p className={`${!open && "hidden"} origin-left duration-200 font-medium`}>Wish List</p>
                                </li>
                            </NavLink>
                            <NavLink to={'/dashboard/myProperty'}>
                                <li className={`flex items-center gap-3 ${!open && "justify-center"}`}>
                                    <img src={house}></img>
                                    <p className={`${!open && "hidden"} origin-left duration-200 font-medium`}>My Property</p>
                                </li>
                            </NavLink>
                            <NavLink to={'/dashboard/myReviews'}>
                                <li className={`flex items-center gap-3 ${!open && "justify-center"}`}>
                                    <img src={review}></img>
                                    <p className={`${!open && "hidden"} origin-left duration-200 font-medium`}>Reviews</p>
                                </li>
                            </NavLink>
                            <NavLink to={'/'}>
                                <li className={`flex items-center gap-3 ${!open && "justify-center"}`}>
                                    <img src={back}></img>
                                    <p className={`${!open && "hidden"} origin-left duration-200 font-medium`}>Go Back</p>
                                </li>
                            </NavLink>
                        </ul>
                    }
                    {
                        userRole == 'admin' && <ul className="mt-10 dashboard-menu">
                            <NavLink to={'/dashboard/adminProfile'}>
                                <li className={`flex items-center gap-3 ${!open && "justify-center"}`}>
                                    <img src={profile}></img>
                                    <p className={`${!open && "hidden"} origin-left duration-200 font-medium`}>Ad Profile</p>
                                </li>
                            </NavLink>
                            <NavLink to={'/'}>
                                <li className={`flex items-center gap-3 ${!open && "justify-center"}`}>
                                    <img src={house}></img>
                                    <p className={`${!open && "hidden"} origin-left duration-200 font-medium`}>Properties</p>
                                </li>
                            </NavLink>
                            <NavLink to={'/'}>
                                <li className={`flex items-center gap-3 ${!open && "justify-center"}`}>
                                    <img src={users}></img>
                                    <p className={`${!open && "hidden"} origin-left duration-200 font-medium`}>Users</p>
                                </li>
                            </NavLink>
                            <NavLink to={'/'}>
                                <li className={`flex items-center gap-3 ${!open && "justify-center"}`}>
                                    <img src={review}></img>
                                    <p className={`${!open && "hidden"} origin-left duration-200 font-medium`}>Reviews</p>
                                </li>
                            </NavLink>
                            <NavLink to={'/'}>
                                <li className={`flex items-center gap-3 ${!open && "justify-center"}`}>
                                    <img src={back}></img>
                                    <p className={`${!open && "hidden"} origin-left duration-200 font-medium`}>Go Back</p>
                                </li>
                            </NavLink>
                        </ul>
                    }
                    {
                        userRole == 'agent' && <ul className="mt-10 dashboard-menu">
                            <NavLink to={'/dashboard/agentProfile'}>
                                <li className={`flex items-center gap-3 ${!open && "justify-center"}`}>
                                    <img src={profile}></img>
                                    <p className={`${!open && "hidden"} origin-left duration-200 font-medium`}>Ag Profile</p>
                                </li>
                            </NavLink>
                            <NavLink to={'/'}>
                                <li className={`flex items-center gap-3 ${!open && "justify-center"}`}>
                                    <img src={house}></img>
                                    <p className={`${!open && "hidden"} origin-left duration-200 font-medium`}>Properties</p>
                                </li>
                            </NavLink>
                            <NavLink to={'/'}>
                                <li className={`flex items-center gap-3 ${!open && "justify-center"}`}>
                                    <img src={users}></img>
                                    <p className={`${!open && "hidden"} origin-left duration-200 font-medium`}>Users</p>
                                </li>
                            </NavLink>
                            <NavLink to={'/'}>
                                <li className={`flex items-center gap-3 ${!open && "justify-center"}`}>
                                    <img src={review}></img>
                                    <p className={`${!open && "hidden"} origin-left duration-200 font-medium`}>Reviews</p>
                                </li>
                            </NavLink>
                            <NavLink to={'/'}>
                                <li className={`flex items-center gap-3 ${!open && "justify-center"}`}>
                                    <img src={back}></img>
                                    <p className={`${!open && "hidden"} origin-left duration-200 font-medium`}>Go Back</p>
                                </li>
                            </NavLink>
                        </ul>
                    }
                </div>
            </div>

            <div className="h-full flex-1 my-14">
                <div className="max-w-[1500px] mx-auto my-auto border-2 p-10">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashborad;