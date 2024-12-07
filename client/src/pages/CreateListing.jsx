

const CreateListing = () => {
    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Create a Listing</h1>
            <form className="flex flex-col sm:flex-row gap-4">
                {/* TOP | LEFT */}
                <div className="flex flex-col gap-4 flex-1">
                    <input
                        type="text"
                        placeholder="Name"
                        className="border p-3 rounded-lg"
                        id="name" maxLength='62' minLength='10'
                        required
                    />

                    <textarea
                        type="text"
                        placeholder="Description"
                        className="border p-3 rounded-lg"
                        id="description" required
                    />

                    <input
                        type="text"
                        placeholder="Address"
                        className="border p-3 rounded-lg"
                        id="address" required
                    />

                    {/* CHECKBOXES START */}
                    <div className="flex gap-4 flex-wrap">
                        <div className="flex gap-2">
                            <input type="checkbox" id="sale" className="w-5" />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="rent" className="w-5" />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="parking" className="w-5" />
                            <span>Parking spots</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="furnished" className="w-5" />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="offer" className="w-5" />
                            <span>Offer</span>
                        </div>
                    </div>
                    {/* CHECKBOXES END */}
                    <div className=" flex gap-8">
                        <div className="flex gap-2 items-center">
                            <input
                                type="number" id="bedrooms"
                                max='10' min='1' required
                                className="p-3 border rounded-lg outline-none"
                            />
                            <span>Beds</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="number" id="bathrooms"
                                max='10' min='1' required
                                className="p-3 border rounded-lg outline-none"
                            />
                            <span>Baths</span>
                        </div>
                    </div>
                    <div className=" flex flex-col gap-4">
                        <div className="flex gap-2 items-center">
                            <input
                                type="number" id="regularPrice"
                                defaultValue={0} required
                                className="p-3 border rounded-lg outline-none w-36"
                            />
                            <div className="flex flex-col items-center">
                                <p>Regular Price</p>
                                <p className="text-sm">($ / month)</p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input
                                type="number" id="discountedPrice"
                                defaultValue={0} required
                                className="p-3 border rounded-lg outline-none w-36"
                            />
                            <div className="flex flex-col items-center">
                                <p>Discounted Price</p>
                                <p className="text-sm">($ / month)</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* TOP | LEFT END */}

                {/* BOTTOM | RIGHT START*/}
                <div className="flex flex-col gap-4 flex-1">
                    <p className="font-semibold">
                        Images:
                        <span className="font-normal text-slate-800">
                            {" "}The first image will be the cover (max 6)
                        </span>
                    </p>
                    <div className="flex gap-4">
                        <input
                            type="file" id="images" accept="image/*"
                            multiple className="border border-gray-300 rounded-lg p-3 w-full"
                        />
                        <button
                            className="uppercase p-3 border rounded-md text-center 
                            border-green-700 text-green-700 hover:shadow-lg disabled:opacity-80"
                        >upload</button>
                    </div>
                    {/* CREATE BUTTON */}
                    <button
                        type="submit"
                        className="uppercase p-3 bg-slate-700 text-white 
                    rounded-lg hover:opacity-95 disabled:opacity-80">
                        create listing
                    </button>
                </div>
                {/* BOTTOM | RIGHT END*/}
            </form>
        </main>
    )
}

export default CreateListing