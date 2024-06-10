import Advertisement from "../components/Advertisement";
import Hero from "../components/Hero";
import OurAgents from "../components/OurAgents";
import { Scroll } from "../components/Scroll";
import WhatWeDo from "../components/WhatWeDo";
import Review from "./Review";
import {Helmet} from "react-helmet";


const Home = () => {
    return (
        <div>
            <Scroll></Scroll>
            <Helmet>
                <title>Homzen</title>
            </Helmet>
            <Hero></Hero>
            <WhatWeDo></WhatWeDo>
            <div className="max-w-[1440px] mx-auto px-4 py-24">
                <div className="text-center mb-10">
                    <p className="font-medium text-[#ed2027]">FEATURED PROPERTIES</p>
                    <h1 className="text-4xl font-medium mt-2">Recommended For You</h1>
                </div>
                <Advertisement></Advertisement>
            </div>
            <Review></Review>
            <OurAgents></OurAgents>
        </div>
    );
};

export default Home;