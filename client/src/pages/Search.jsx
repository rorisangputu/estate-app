

const Search = () => {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="p-7  border border-b-2 md:border-r-2 md:min-h-screen">
                <form action="">
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap">Search:</label>
                        <input type="text" name=""
                            id="searchTern" placeholder="Search.."
                            className="border rounded-lg p-3 w-full"
                        />
                    </div>
                    <div className="">
                        <label>Type:</label>
                        <div>
                            <input type="checkbox" id="all" className="h-5" />
                            <span>Sale & Rent</span>
                        </div>
                    </div>
                </form>
            </div>
            <div className="flex-1">
                <h1>Listing results:</h1>
            </div>
        </div>
    )
}

export default Search