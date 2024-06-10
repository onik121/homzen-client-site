import { Avatar, Dropdown, DropdownHeader, DropdownItem, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle, } from "flowbite-react";
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png'
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import useRole from "../hooks/useRole";
import userImg from '../assets/icons/user1.png'

const MenuBar = () => {

    const { user, logOut, loading } = useAuth();
    const [userRole] = useRole();
    console.log(userRole)
    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success('Log Out Sucessfull', {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    theme: "light",
                });
            })
    }

    return (
        <Navbar fluid className="max-w-[1440px] mx-auto">
            <NavbarBrand>
                <NavLink to={'/'}><img src={logo} className="mr-3 h-6 sm:h-9" /></NavLink>
            </NavbarBrand>
            <div className="flex md:order-2">
                {
                    loading ? <img src={userImg} className="w-[40px]"></img> : <>{
                        user ? <Dropdown arrowIcon={false} inline label={<Avatar alt="User" img={user?.photoURL} rounded />}>
                            <DropdownHeader>
                                <span className="block text-sm mb-1">{user?.displayName}</span>
                                <span className="block truncate text-sm font-medium">{user?.email}</span>
                            </DropdownHeader>
                            {
                                user && userRole === 'none' && <>
                                    <DropdownItem href="/wishlist">Wishlist</DropdownItem>
                                    <DropdownItem href="/requestedproperty">Request Properties</DropdownItem>
                                    <DropdownItem href="/myproperties">My Properties</DropdownItem>
                                    <DropdownItem href="/myReviews">My Reviews</DropdownItem>
                                </>
                            }
                            <DropdownItem onClick={handleLogout}>Sign Out</DropdownItem>
                        </Dropdown> : <NavLink to={'/login'}><button className="sign-in">Sign In</button></NavLink>
                    }</>
                }
                <NavbarToggle />
            </div>
            <NavbarCollapse className="menu-item">
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/allproperties'}>All Properties</NavLink>
                {
                    user && userRole === 'admin' && <NavLink to={'/dashboard/adminProfile'}>Dashboard</NavLink>
                }
                {
                    user && userRole === 'agent' && <NavLink to={'/dashboard/agentProfile'}>Dashboard</NavLink>
                }
            </NavbarCollapse>
        </Navbar>
    );
};

export default MenuBar;