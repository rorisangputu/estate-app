/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"


const ListingItem = ({ listing }) => {
    return (
        <div>
            <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt="listing cover"
                    className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105
                    transition-scale duration-300 "
                />
            </Link>
        </div>
    )
}

export default ListingItem