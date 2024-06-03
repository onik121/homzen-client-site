import useProperties from "../hooks/useProperties";
import PropertyCard from "./PropertyCard";


const Advertisement = () => {


    const [properties] = useProperties();

    return (
        <div className="Property-cart-container">
            {
                properties.slice(0, 6).map(item => <PropertyCard key={item._id} item={item}></PropertyCard>)
            }
        </div>
    );
};

export default Advertisement;