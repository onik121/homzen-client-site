import { useParams } from "react-router-dom";


const Details = () => {

    const location = useParams()
    console.log(location.id)

    return (
        <div>
            details
        </div>
    );
};

export default Details;