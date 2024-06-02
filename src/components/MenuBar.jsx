import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle, } from "flowbite-react";
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png'

const MenuBar = () => {
    return (
        <Navbar fluid className="bg-red-100">
            <NavbarBrand>
                <img src={logo} className="mr-3 h-6 sm:h-9" />
            </NavbarBrand>
            <div className="flex md:order-2">
                <Dropdown arrowIcon={false} inline label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />}>
                    <DropdownHeader>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                    </DropdownHeader>
                    <DropdownItem>Dashboard</DropdownItem>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownItem>Earnings</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem>Sign out</DropdownItem>
                </Dropdown>
                <NavbarToggle />
            </div>
            <NavbarCollapse>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink>All Properties</NavLink>
                <NavLink to={'/login'}>Login</NavLink>
            </NavbarCollapse>
        </Navbar>
    );
};

export default MenuBar;