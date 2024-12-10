import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const params = useParams();

    useEffect(() => {
        const fetchListing = async () => {
            //setLoading(true);
            try {
                setLoading(true)
                const listingId = params.id;
                const res = await fetch(`/api/listing/get/${listingId}`)
                const data = await res.json()

                if (data.success === false) {
                    setError(data.message)
                    setLoading(false);
                }
                setListing(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }

            //console.log(listing);
        }

        fetchListing();
    }, [params.id]);

    return (
        <main>
            {loading && <p className="text-center my-7 text-2xl ">Loading...</p>}
            {error && <p className="text-center text-red-700 my-7 text-xl ">Something went wrong...</p>}
            {listing && !loading && !error && (
                <div>
                    <Swiper navigation>
                        {listing.imageUrls.map((url) => (
                            <SwiperSlide key={url}>
                                <div className="h-[300px] md:h-[500px] bg-cover" style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}>

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </main>
    )
}

export default Listing