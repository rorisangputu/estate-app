import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import ListingItem from "../components/ListingItem";

const Search = () => {
    const navigate = useNavigate();
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc'
    });
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    console.log(listings);

    useEffect(() => {

        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const orderFromUrl = urlParams.get('order');
        const sortFromUrl = urlParams.get('sort');

        if (
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            orderFromUrl ||
            sortFromUrl
        ) {
            setSidebarData({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                order: orderFromUrl || 'desc',
                sort: sortFromUrl || 'created_at'
            })
        }

        const fetchListings = async () => {
            setLoading(true);
            try {

                const searchQuery = urlParams.toString();
                const res = await fetch(`/api/listing/get?${searchQuery}`);
                const data = await res.json();
                if (data.success === false) {
                    console.log(data.message);
                    setLoading(false);
                    return;
                }
                setListings(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
            setLoading(false);
        }

        fetchListings();

    }, [location.search]);

    const handleChange = (e) => {
        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setSidebarData({ ...sidebarData, type: e.target.id });
        }

        if (e.target.id === 'searchTerm') {
            setSidebarData({ ...sidebarData, searchTerm: e.target.value });
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSidebarData({
                ...sidebarData,
                [e.target.id]:
                    e.target.checked || e.target.checked === 'true' ? true : false,
            });
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';

            const order = e.target.value.split('_')[1] || 'desc';

            setSidebarData({ ...sidebarData, sort, order });
        }
    };

    const handleFilter = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('type', sidebarData.type);
        urlParams.set('parking', sidebarData.parking);
        urlParams.set('furnished', sidebarData.furnished);
        urlParams.set('offer', sidebarData.offer);
        urlParams.set('order', sidebarData.order);
        urlParams.set('sort', sidebarData.sort);

        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }


    return (
        <div className="flex flex-col md:flex-row">
            <div className="p-7 border border-b-2 md:border-r-2 md:min-h-screen">
                <form onSubmit={handleFilter} className="flex flex-col gap-8">
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">Search:</label>
                        <input type="text" name=""
                            id="searchTerm" placeholder="Search.."
                            className="border rounded-lg p-3 w-full"
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">Type:</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="all" className="w-5 h-5"
                                onChange={handleChange}
                                checked={sidebarData.type === 'all'}
                            />
                            <span>Sale & Rent</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="sale" className="w-5 h-5"
                                onChange={handleChange}
                                checked={sidebarData.type === 'sale'}
                            />
                            <span>Sale</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="rent" className="w-5 h-5"
                                onChange={handleChange}
                                checked={sidebarData.type === 'rent'}
                            />
                            <span>Rent</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="offer" className="w-5 h-5"
                                onChange={handleChange}
                                checked={sidebarData.offer}
                            />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">Amenities:</label>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="parking" className="w-5 h-5"
                                onChange={handleChange}
                                checked={sidebarData.parking}
                            />
                            <span>Parking</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="furnished"
                                className="w-5 h-5"
                                onChange={handleChange}
                                checked={sidebarData.furnished}
                            />
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">Sort:</label>
                        <select name=""
                            id="sort_order"
                            className="border rounded-lg p-3"
                            onChange={handleChange}
                            defaultValue={'created_at_desc'}
                        >
                            <option value="regularPrice_desc">Price: High to Low</option>
                            <option value="regularPrice_asc">Price: Low to High</option>
                            <option value="createdAt_desc">Latest</option>
                            <option value="createdAt_asc">Oldest</option>
                        </select>
                    </div>
                    <button disabled={loading} className="p-3 bg-slate-700 text-white uppercase rounded-lg disabled:opacity-80">Filter</button>
                </form>
            </div>
            <div className="">
                <h1 className="text-3xl font-semibold border-b p-3 text-slate-600 mt-5">Listing results:</h1>
                <div className="p-7 flex flex-col gap-5 sm:flex-row flex-wrap">
                    {!loading && listings.length === 0 && (
                        <p className="text-xl text-center text-slate-700">No listings found!</p>
                    )}
                    {loading && (
                        <p className="text-xl text-slate-700 text-center">Loading..</p>
                    )}
                    {!loading && listings && listings.map((listing) =>
                        <ListingItem key={listing._id} listing={listing} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Search