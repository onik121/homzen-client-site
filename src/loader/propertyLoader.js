export const propertyLoader = async ({ params }) => {
    try {
        const [propertyResponse, otherDataResponse] = await Promise.all([
            fetch(`http://localhost:5000/properties/${params.id}`),
            fetch(`http://localhost:5000/reviews/${params.id}`)
        ]);

        const property = propertyResponse.ok ? await propertyResponse.json() : null;
        const reviews = otherDataResponse.ok ? await otherDataResponse.json() : null;

        return { property, reviews };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { property: null, otherData: null };
    }
};
