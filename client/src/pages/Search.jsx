import { useState } from "react"


const Search = () => {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        sort: 'created_at',
        order: 'desc'
    });

    const handleChange = (e) => {

    };

    const handleFilter = () => {

    }
    return (
        <div className="flex flex-col md:flex-row">
            <div className="p-7  border border-b-2 md:border-r-2 md:min-h-screen">
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
                                checked={sidebarData.type = 'all'}
                            />
                            <span>Sale & Rent</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="sale" className="w-5 h-5"
                                onChange={handleChange}
                                checked={sidebarData.type = 'sale'}
                            />
                            <span>Sale</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="rent" className="w-5 h-5"
                                onChange={handleChange}
                                checked={sidebarData.type = 'rent'}
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
                            <input type="checkbox" id="furnished" className="w-5 h-5"
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
                            className="border rounded-lg p-3 "
                        >
                            <option value="">Price: High to Low</option>
                            <option value="">Price: Low to High</option>
                            <option value="">Latest</option>
                            <option value="">Oldest</option>
                        </select>
                    </div>
                    <button className="p-3 bg-slate-700 text-white uppercase rounded-lg">Filter</button>
                </form>
            </div>
            <div className="">
                <h1 className="text-3xl font-semibold border-b p-3 text-slate-600 mt-5">Listing results:</h1>
            </div>
        </div>
    )
}

export default Search