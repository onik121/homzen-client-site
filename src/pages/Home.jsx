import AllProperties from "../components/AllProperties";
import Hero from "../components/Hero";



const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <div className="bg-red- my-20">
                <div className="text-center">
                    <p className="font-medium text-[#ed2027]">FEATURED PROPERTIES</p>
                    <h1 className="text-4xl font-medium mt-2">Recommended For You</h1>
                </div>
                <AllProperties></AllProperties>
            </div>
            <div className="h-screen"></div>
        </div>
    );
};

export default Home;