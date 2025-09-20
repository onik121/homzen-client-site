import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const EditAddedProperty = () => {

    const item = useLoaderData();
    const { property_status, property_title, property_location, price, apartment_type, built_year, description, area, bedrooms, washrooms, garages, land_size, property_image, _id } = item;
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, formState: { errors } } = useForm();
     const [loading, setLoading] = useState(false);  // Loader state

    const onSubmit = async (data) => {
        setLoading(true);  // Start loader
        const updateData = {
            property_title: data.title,
            property_location: data.location,
            price: parseFloat(data.price),
            apartment_type: data.type,
            bedrooms: parseFloat(data.bedrooms),
            area: parseFloat(data.area),
            washrooms: parseFloat(data.washrooms),
            garages: parseFloat(data.garages),
            land_size: parseFloat(data.land),
            built_year: parseFloat(data.year),
            property_status: data.status,
            description: data.description,
            property_image: property_image,
        };

        if (data.image && data.image[0]) {
            const formData = new FormData();
            formData.append('image', data.image[0]);
            try {
                const res = await axiosPublic.post(image_hosting_api, formData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                });

                if (res.data.status === 200 && res.data.success) {
                    updateData.property_image = res.data.data.display_url;
                } else {
                    toast.error('Failed to add Image');
                    return;
                }
            } catch (error) {
                console.log(error.message);
                toast.error('Image upload failed');
                return;
            }
        }

        try {
            const response = await axiosSecure.patch(`/properties/${_id}`, updateData);
            if (response.data.modifiedCount > 0) {
                toast.success('Update Successfully');
            }
        } catch (error) {
            console.log(error.code);
            toast.error(`Error: ${error.code}`);
        }
        finally {
            setLoading(false); // Stop loader
        }
    };

    return (
        <div className='overflow-x-auto border-2 p-10 max-w-[1200px] mx-auto'>
            <h1 className='text-3xl font-medium text-black mb-6'>Update Your Property</h1>
            <div className="p-5 border-2 min-w-[900px]">
                <form onSubmit={handleSubmit(onSubmit)} className="add-property space-y-7">
                    <div className='flex gap-7'>
                        <div className='w-full'>
                            <label className="block">Property Title</label>
                            <input {...register("title", { required: true })} type="text" defaultValue={property_title} />
                            {errors.title && <span className='text-red-600'>Property Title is required</span>}
                        </div>
                        <div className='w-full'>
                            <label className="block">Property Location</label>
                            <input {...register("location", { required: true })} type="text" defaultValue={property_location} />
                            {errors.location && <span className='text-red-600'>Property Location is required</span>}
                        </div>
                        <div className='w-full'>
                            <label className="block">Property Price</label>
                            <input {...register("price", { required: true })} type="number" defaultValue={price} />
                            {errors.price && <span className='text-red-600'>Property Price is required</span>}
                        </div>
                    </div>
                    <div className="flex gap-7">
                        <div className="w-full">
                            <label className="block">Property Type</label>
                            <select defaultValue={apartment_type} {...register("type", { required: true })}>
                                <option value="" disabled>Select a Category</option>
                                <option value="house">House</option>
                                <option value="villa">Villa</option>
                                <option value="office">Office</option>
                            </select>
                            {errors.type && <span className='text-red-600'>Category is required</span>}
                        </div>
                        <div className="w-full">
                            <label className="block">Property Status</label>
                            <select defaultValue={property_status} {...register("status", { required: true })}>
                                <option value="" disabled>Select a Category</option>
                                <option value="sale">Sale</option>
                                <option value="rent">Rent</option>
                            </select>
                            {errors.status && <span className='text-red-600'>Category is required</span>}
                        </div>
                        <div className='w-full'>
                            <label className="block">Built Year</label>
                            <input {...register("year", { required: true })} type="number" placeholder='Like this (2010)' defaultValue={built_year} />
                            {errors.year && <span className='text-red-600'>Built Year is required</span>}
                        </div>
                    </div>
                    <div className='flex gap-7'>
                        <div className='w-full'>
                            <label className="block">Property Area</label>
                            <input {...register("area", { required: true })} type="number" placeholder='SqFt' defaultValue={area} />
                            {errors.area && <span className='text-red-600'>Property Area is required</span>}
                        </div>
                        <div className='w-full'>
                            <label className="block">Land Size</label>
                            <input {...register("land", { required: true })} type="number" placeholder='SqFt' defaultValue={land_size} />
                            {errors.land && <span className='text-red-600'>Land Size is required</span>}
                        </div>
                        <div className='w-full'>
                            <label className="block">Total Bedrooms</label>
                            <input {...register("bedrooms", { required: true })} type="number" defaultValue={bedrooms} />
                            {errors.bedrooms && <span className='text-red-600'>Bedrooms number is required</span>}
                        </div>
                    </div>
                    <div className='flex gap-7'>
                        <div className='w-full'>
                            <label className="block">Total Washrooms</label>
                            <input {...register("washrooms", { required: true })} type="number" defaultValue={washrooms} />
                            {errors.washrooms && <span className='text-red-600'>Washrooms number is required</span>}
                        </div>
                        <div className='w-full'>
                            <label className="block">Total Garages</label>
                            <input {...register("garages", { required: true })} type="number" defaultValue={garages} />
                            {errors.garages && <span className='text-red-600'>Garage Number is required</span>}
                        </div>
                        <div className='w-full'>
                            <label className='block'>Property Image</label>
                            <input type="file" {...register("image")} />
                        </div>
                    </div>
                    <div>
                        <textarea {...register("description", { required: true })} className='w-full' defaultValue={description}></textarea>
                        {errors.description && <span className='text-red-600'>Description is required</span>}
                    </div>
                    {/* <button type="submit" className='submit'>Update</button> */}
                    <button
                        className='submit flex items-center justify-center'
                        disabled={loading}
                    >
                        {loading ? <span className="loader"></span> : "Update"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditAddedProperty;
