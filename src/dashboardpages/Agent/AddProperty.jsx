import { useForm } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css";
import useAuth from './../../hooks/useAuth';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Helmet } from 'react-helmet';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddProperty = () => {

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        // upload the image on the imgbb and then get the url
        const imageFile = { image: data.image[0] }
        try {
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            if (res.data.status === 200 && res.data.success) {
                // now send the menu item data to the server with the image url
                const status = 'pending';
                const propertyItem = {
                    property_title: data.title,
                    property_location: data.location,
                    price: parseFloat(data.price),
                    agent_name: user.displayName,
                    agent_image: user.photoURL,
                    verification_status: status,
                    apartment_type: data.type,
                    bedrooms: parseFloat(data.bedrooms) ,       
                    area: parseFloat(data.area),
                    washrooms: parseFloat(data.washrooms),
                    garages: parseFloat(data.garages),
                    land_size: parseFloat(data.land),
                    built_year: parseFloat(data.year),
                    property_status: data.status,
                    description: data.description,
                    agent_email: user.email,
                    property_image: res.data.data.display_url,
                    created_at: new Date(),
                }
                try {
                    const response = await axiosSecure.post('/properties', propertyItem)
                    if (response.data.insertedId) {
                        toast.success('Added Successfully');
                        reset();
                    }
                }
                catch (error) {
                    console.log(error.code)
                    toast.error(`Error: ${error.code}`);
                }
            }
            else {
                toast.error('Failed to add Image');
            }
        }
        catch (error) {
            console.log(error.message)
        }
    };

    return (
        <div className='overflow-x-auto border-2 p-10 max-w-[1200px] mx-auto'>
            <Helmet>
                <title>Add A Property</title>
            </Helmet>
            <h1 className='text-3xl font-medium text-black mb-6'>Add Your Property</h1>
            <div className="p-5 border-2 min-w-[900px]">
                <form onSubmit={handleSubmit(onSubmit)} className="add-property space-y-7">
                    <div className='flex gap-7'>
                        <div className='w-full'>
                            <label className="block">Property Title</label>
                            <input {...register("title", { required: true })} type="text" />
                            {errors.title && <span className='text-red-600'>Property Title is required</span>}
                        </div>
                        <div className='w-full'>
                            <label className="block">Property Location</label>
                            <input {...register("location", { required: true })} type="text" />
                            {errors.location && <span className='text-red-600'>Property Location is required</span>}
                        </div>
                        <div className='w-full'>
                            <label className="block">Property Price</label>
                            <input {...register("price", { required: true })} type="number" placeholder='Per SqFt Price'/>
                            {errors.price && <span className='text-red-600'>Property Price is required</span>}
                        </div>
                    </div>
                    <div className="flex gap-7">
                        <div className="w-full">
                            <label className="block">Property Type</label>
                            <select defaultValue="" {...register("type", { required: true })}>
                                <option value="" disabled>Select a Category</option>
                                <option value="house">House</option>
                                <option value="villa">Villa</option>
                                <option value="office">Office</option>
                            </select>
                            {errors.type && <span className='text-red-600'>Category is required</span>}
                        </div>
                        <div className="w-full">
                            <label className="block">Property Status</label>
                            <select defaultValue="" {...register("status", { required: true })}>
                                <option value="" disabled>Select a Category</option>
                                <option value="sale">Sale</option>
                                <option value="rent">Rent</option>
                            </select>
                            {errors.status && <span className='text-red-600'>Category is required</span>}
                        </div>
                        <div className='w-full'>
                            <label className="block">Built Year</label>
                            <input {...register("year", { required: true })} type="number" placeholder='Like this (2010)' />
                            {errors.year && <span className='text-red-600'>Built Year is required</span>}
                        </div>
                    </div>
                    <div className='flex gap-7'>
                        <div className='w-full'>
                            <label className="block">Property Area</label>
                            <input {...register("area", { required: true })} type="number" placeholder='SqFt' />
                            {errors.area && <span className='text-red-600'>Property Area is required</span>}
                        </div>
                        <div className='w-full'>
                            <label className="block">Land Size</label>
                            <input {...register("land", { required: true })} type="number" placeholder='SqFt' />
                            {errors.land && <span className='text-red-600'>Land Size is required</span>}
                        </div>
                        <div className='w-full'>
                            <label className="block">Total Bedrooms</label>
                            <input {...register("bedrooms", { required: true })} type="number" />
                            {errors.bedrooms && <span className='text-red-600'>Bedrooms number is required</span>}
                        </div>
                    </div>
                    <div className='flex gap-7'>
                        <div className='w-full'>
                            <label className="block">Total Washrooms</label>
                            <input {...register("washrooms", { required: true })} type="number" />
                            {errors.washrooms && <span className='text-red-600'>Washrooms number is required</span>}
                        </div>
                        <div className='w-full'>
                            <label className="block">Total Garages</label>
                            <input {...register("garages", { required: true })} type="number" />
                            {errors.garages && <span className='text-red-600'>Garage Number is required</span>}
                        </div>
                        <div className='w-full'>
                            <label className='block'>Property Image</label>
                            <input {...register("image", { required: true })} type="file" className='image-input' />
                            {errors.image && <span className='text-red-600'>Image is required</span>}
                        </div>
                    </div>
                    <div>
                        <textarea {...register("description", { required: true })} className='w-full'></textarea>
                        {errors.description && <span className='text-red-600'>Description is required</span>}
                    </div>
                    <button className='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddProperty;
