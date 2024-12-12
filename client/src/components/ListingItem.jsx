/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { MdLocationOn } from "react-icons/md";

const ListingItem = ({ listing }) => {
    return (
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow 
        overflow-hidden rounded-lg w-full sm:w-[330px]">
            <Link to={`/listing/${listing._id}`} className="flex flex-col gap-4 ">
                <img src={listing.imageUrls[0]} alt="listing cover"
                    className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105
                    transition-scale duration-300 "
                />
                <div className="p-3 flex flex-col gap-2 w-full">
                    <p className="text-lg font-semibold 
                        text-slate-700 truncate"
                    >
                        {listing.name}
                    </p>
                    <div className="flex items-center gap-2">
                        <MdLocationOn className="h-5 w-5 text-green-600" />
                        <p className="truncate text-sm text-gray-600 w-full">{listing.address}</p>
                    </div>
                    <p className="line-clamp-1 sm:line-clamp-2 
                        text-sm text-gray-600"
                    >
                        {listing.description}
                    </p>
                    {
                        listing.offer ? <p>R {listing.discountedPrice.toLocaleString('en-US')} / month</p> : <p>R {listing.regularPrice.toLocaleString('en-US')}</p>
                    }
                </div>
            </Link>
        </div>
    )
}

export default ListingItem