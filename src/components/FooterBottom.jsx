import { Footer, FooterBrand, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle, } from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'

const FooterBottom = () => {
    return (
        <Footer className="bg-red- rounded-none shadow-none px-4">
            <div className="w-full">
                <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1 max-w-[1410px] mx-auto">
                    <div>
                        <FooterBrand
                            href="#"
                            src={logo}
                            alt="Logo"
                        />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-[#3f3f3f] mb-3">Quick Link</h2>
                        <Link className="block">Login</Link>
                        <Link className="block">Blogs</Link>
                        <Link className="block">Profile</Link>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-[#3f3f3f] mb-3">Legal</h2>
                        <Link className="block">Terms of use</Link>
                        <Link className="block">Privacy policy</Link>
                        <Link className="block">Cookie policy</Link>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-[#3f3f3f] mb-3">Contact Us</h2>
                        <Link className="block">Feni Sadar, Feni, Bangladesh</Link>
                        <Link className="block">+88 01608272038</Link>
                        <Link className="block">hasanjahid557788@gmail.com</Link>
                    </div>
                </div>
                <FooterDivider />
                <div className="w-full sm:flex sm:items-center sm:justify-between pb-5 max-w-[1410px] mx-auto">
                    <FooterCopyright href="#" by="Flowbite™" year={2022} />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <FooterIcon href="#" icon={BsFacebook} />
                        <FooterIcon href="#" icon={BsInstagram} />
                        <FooterIcon href="#" icon={BsTwitter} />
                    </div>
                </div>
            </div>
        </Footer>
    );
};

export default FooterBottom;