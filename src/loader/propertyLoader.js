export const propertyLoader = async ({ params }) => {
    try {
        const [propertyResponse, otherDataResponse] = await Promise.all([
            fetch(`https://assignment-12-server-gray-one.vercel.app/properties/${params.id}`),
            fetch(`https://assignment-12-server-gray-one.vercel.app/reviews/${params.id}`)
        ]);

        const property = propertyResponse.ok ? await propertyResponse.json() : null;
        const reviews = otherDataResponse.ok ? await otherDataResponse.json() : null;

        return { property, reviews };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { property: null, otherData: null };
    }
};
