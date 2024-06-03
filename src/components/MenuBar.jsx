import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle, } from "flowbite-react";
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png'
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const MenuBar = () => {

    const { user, logOut } = useAuth();
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
                    user ? <Dropdown arrowIcon={false} inline label={<Avatar alt="User settings" img={user?.photoURL} rounded />}>
                        <DropdownHeader>
                            <span className="block text-sm mb-1">{user?.displayName}</span>
                            <span className="block truncate text-sm font-medium">{user?.email}</span>
                        </DropdownHeader>
                        <DropdownItem>Dashboard</DropdownItem>
                        <DropdownItem>Settings</DropdownItem>
                        {/* <DropdownDivider /> */}
                        <DropdownItem><button onClick={handleLogout}>Sign Out</button></DropdownItem>
                    </Dropdown> : <NavLink to={'/login'}><button className="sign-in">Sign In</button></NavLink>
                }

                <NavbarToggle />
            </div>
            <NavbarCollapse>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink>All Properties</NavLink>
            </NavbarCollapse>
        </Navbar>
    );
};

export default MenuBar;