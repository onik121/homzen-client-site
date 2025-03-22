import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Review = () => {
    const axiosPublic = useAxiosPublic();
    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/reviews');
            return data;
        }
    });

    return (
        <div className="max-w-[1440px] mx-auto px-4 pb-24">
            <div className="text-center mb-10">
                <p className="font-medium text-[#ed2027]">TOP PROPERTIES</p>
                <h1 className="text-4xl font-medium mt-2">What’s People Say’s</h1>
            </div>
            
            {/* Swiper Container */}
            <div className="relative">
                <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                    pagination={{ clickable: true }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }}
                >
                    {reviews.slice(0, 6).map(item => (
                        <SwiperSlide key={item._id}>
                            <div className="border-2 p-4 min-h-[230px]">
                                <div className="space-y-5 min-h-full">
                                    <h1 className="text-3xl font-medium text-black">{item.property_title}</h1>
                                    <p className="text-lg">{item.review_description}</p>
                                    <div className="flex items-center gap-3">
                                        <img className="w-[35px] rounded-full" src={item.reviewer_image} alt="Reviewer" />
                                        <p>{item.reviewer_name}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Buttons (Only Visible in Mobile View) */}
                <div className="flex justify-center gap-6 mt-10 md:hidden onik">
                    <button className="swiper-button-prev bg-[#ed2027] text-white px-4 py-2 rounded">
                        
                    </button>
                    <button className="swiper-button-next bg-[#ed2027] text-white px-4 py-2 rounded">
                        
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Review;
