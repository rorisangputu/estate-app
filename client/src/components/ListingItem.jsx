/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"


const ListingItem = ({ listing }) => {
    return (
        <div>
            <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt="" />
            </Link>
        </div>
    )
}

export default ListingItem