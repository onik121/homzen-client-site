import buyHome from '../assets/icons/buy.png'
import rentHome from '../assets/icons/rent.png'
import saleHome from '../assets/icons/housesale.png'

const WhatWeDo = () => {
    return (
        <div className="max-w-[1440px] mx-auto px-4 pt-24">
            <div className="text-center mb-10">
                <p className="font-medium text-[#ed2027]">OUR SERVICES</p>
                <h1 className="text-4xl font-medium mt-2">What We Do?</h1>
            </div>
            <div className="service-boxs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-5 text-center box-shadow p-4 rounded-md">
                    <img src={buyHome} className="w-[80px] mx-auto"></img>
                    <h2 className="text-2xl text-black font-medium">Buy A New Home</h2>
                    <p>Discover your dream home effortlessly. Explore diverse properties and expert guidance for a seamless buying experience.</p>
                </div>
                <div className="space-y-5 text-center box-shadow p-4 rounded-md">
                    <img src={rentHome} className="w-[80px] mx-auto"></img>
                    <h2 className="text-2xl text-black font-medium">Rent A Home</h2>
                    <p>Discover your dream home effortlessly. Explore diverse properties and expert guidance for a seamless buying experience.</p>
                </div>
                <div className="space-y-5 text-center box-shadow p-4 rounded-md">
                    <img src={saleHome} className="w-[80px] mx-auto"></img>
                    <h2 className="text-2xl text-black font-medium">Sell A Home</h2>
                    <p>Discover your dream home effortlessly. Explore diverse properties and expert guidance for a seamless buying experience.</p>
                </div>
            </div>
        </div>
    );
};

export default WhatWeDo;
