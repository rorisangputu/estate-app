import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Listing = () => {
    const [listing, setListing] = useState({})
    const params = useParams();

    useEffect(() => {
        const fetchListing = async () => {
            const listingId = params.id;
            const res = await fetch(`/api/listing/get/${listingId}`)
            const data = await res.json()

            if (data.success === false) {
                console.log(data.message);
            }
            setListing(data);
            //console.log(listing);
        }

        fetchListing();
    }, []);
    return (
        <div>Listing</div>
    )
}

export default Listing