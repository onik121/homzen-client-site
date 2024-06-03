import AllProperties from "../components/AllProperties";


const Properties = () => {
    return (
        <div className="max-w-[1440px] mx-auto px-4 py-24">
            <div className="text-center">
                <p className="font-medium text-[#ed2027]">FEATURED PROPERTIES</p>
                <h1 className="text-4xl font-medium mt-2">Recommended For You</h1>
            </div>
            <AllProperties></AllProperties>
        </div>
    );
};

export default Properties;