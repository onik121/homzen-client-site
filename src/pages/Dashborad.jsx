import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import close from '../assets/icons/left-chevron.png'
import profile from '../assets/icons/user.png'
import review from '../assets/icons/rating.png'
import users from '../assets/icons/group.png'
import back from '../assets/icons/return.png'
import house from '../assets/icons/house.png'
import useRole from "../hooks/useRole";

const Dashborad = () => {

    const [open, setOpen] = useState(true);
    const [userRole] = useRole();

    return (
        <div className="flex">
            <div className={` ${open ? "w-72" : "w-24 "} h-screen relative duration-300 dasboard px-5 py-8`}>
                <img src={close} className={`absolute cursor-pointer -right-5 top-5 ${!open && "rotate-180"} open-close`} onClick={() => setOpen(!open)} />
                <div className="flex gap-x-3 items-center">
                    <img className="max-w-[40px]" src="./src/assets/logo2.png" />
                    <h1 className={`text-black font-medium text-2xl duration-200 ${!open && "scale-0"}`}>Homzen</h1>
                </div>
                {
                    userRole == 'admin' && <ul className="mt-10 dashboard-menu">
                        <NavLink to={'/'}>
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
                        <NavLink to={'/'}>
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
                {
                    userRole == 'none' && <ul className="mt-10 dashboard-menu">
                        <NavLink to={'/'}>
                            <li className={`flex items-center gap-3 ${!open && "justify-center"}`}>
                                <img src={profile}></img>
                                <p className={`${!open && "hidden"} origin-left duration-200 font-medium`}>Normal</p>
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

            <div className="h-screen flex-1 p-7">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashborad;