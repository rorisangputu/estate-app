/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"


const ListingItem = ({ listing }) => {
    return (
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg">
            <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt="listing cover"
                    className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105
                    transition-scale duration-300 "
                />
                <div>
                    <p>{listing.name}</p>
                </div>
            </Link>
        </div>
    )
}

export default ListingItem