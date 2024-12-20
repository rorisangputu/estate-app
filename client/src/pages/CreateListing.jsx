/* eslint-disable no-unused-vars */
import { useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'sale',
        parking: false,
        furnished: false,
        offer: false,
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountedPrice: 0,
        userRef: currentUser._id
    });

    const [imageUploadError, setImageUploadError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    console.log(formData);
    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setLoading(true);
            setImageUploadError(false);

            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }

            Promise.all(promises).then((urls) => {
                setFormData({
                    ...formData,
                    imageUrls: formData.imageUrls.concat(urls)
                });
                setImageUploadError(false);
                setLoading(false);
            }).catch((error) => {
                setImageUploadError('Image uplaod failed (1 mb max size per image');
                setLoading(false);
            });
        } else {
            setImageUploadError('You can only upload 6 images per listing');
            setLoading(false);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    }

    const handleDeleteImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        })
    }

    const handleChange = (e) => {

        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id
            });
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }

        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (formData.imageUrls.length < 1)
                return setImageUploadError('You must upload at least one (1) image');
            if (+formData.regularPrice < +formData.discountedPrice)
                return setSubmitError('Discount price must be lower than regular price');
            setSubmitLoading(true);
            setSubmitError(false);
            const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            setSubmitLoading(false);
            if (data.success === false) {
                setSubmitError(data.message);
            }
            navigate(`/listing/${data._id}`)

        } catch (error) {
            setSubmitError(error.message);
            setSubmitLoading(false);
        }

    }

    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Create a Listing</h1>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                {/* TOP | LEFT */}
                <div className="flex flex-col gap-4 flex-1">
                    <input
                        type="text"
                        placeholder="Name"
                        className="border p-3 rounded-lg"
                        id="name" maxLength='62' minLength='10'
                        required
                        onChange={handleChange}
                        value={formData.name}
                    />

                    <textarea
                        type="text"
                        placeholder="Description"
                        className="border p-3 rounded-lg"
                        id="description" required
                        onChange={handleChange}
                        value={formData.description}
                    />

                    <input
                        type="text"
                        placeholder="Address"
                        className="border p-3 rounded-lg"
                        id="address" required
                        onChange={handleChange}
                        value={formData.address}
                    />

                    {/* CHECKBOXES START */}
                    <div className="flex gap-4 flex-wrap">
                        <div className="flex gap-2">
                            <input
                                type="checkbox" id="sale"
                                className="w-5"
                                onChange={handleChange}
                                checked={formData.type === 'sale'}
                            />
                            <span>Sell</span>

                        </div>

                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="rent" className="w-5"
                                onChange={handleChange}
                                checked={formData.type === 'rent'}
                            />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox" id="parking"
                                className="w-5"
                                onChange={handleChange}
                                value={formData.parking}
                            />
                            <span>Parking Spots</span>

                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox" id="furnished"
                                className="w-5"
                                onChange={handleChange}
                                value={formData.furnished}
                            />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox" id="offer"
                                className="w-5"
                                onChange={handleChange}
                                value={formData.offer}
                            />
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
                                onChange={handleChange}
                                value={formData.bedrooms}
                            />
                            <span>Beds</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="number" id="bathrooms"
                                max='10' min='1' required
                                className="p-3 border rounded-lg outline-none"
                                onChange={handleChange}
                                value={formData.bathrooms}
                            />
                            <span>Baths</span>
                        </div>
                    </div>
                    <div className=" flex flex-col gap-4">
                        <div className="flex gap-2 items-center">
                            <input
                                type="number" id="regularPrice" required
                                className="p-3 border rounded-lg outline-none w-36"
                                onChange={handleChange}
                                min='50'
                                max='100000000000'
                                value={formData.regularPrice}
                            />
                            <div className="flex flex-col items-center">
                                <p>Regular Price</p>
                                {formData.type === 'rent' && (<p className="text-sm">($ / month)</p>)}
                            </div>
                        </div>
                        {formData.offer &&
                            (
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="number" id="discountedPrice" required
                                        className="p-3 border rounded-lg outline-none w-36"
                                        onChange={handleChange}
                                        min='0'
                                        max='1000000000'
                                        value={formData.discountedPrice}
                                    />
                                    <div className="flex flex-col items-center">
                                        <p>Discounted Price</p>
                                        {formData.type === 'rent' && (<p className="text-sm">($ / month)</p>)}
                                    </div>
                                </div>
                            )
                        }
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

                    {/* UPLOAD IMAGE SYSTEM START */}
                    <div className="flex gap-4">
                        <input
                            onChange={(e) => setFiles(e.target.files)}
                            type="file" id="images" accept="image/*"
                            multiple className="border border-gray-300 rounded-lg p-3 w-full"
                        />
                        <button disabled={loading} type="button" onClick={handleImageSubmit}
                            className="uppercase p-3 border rounded-md text-center 
                            border-green-700 text-green-700 hover:shadow-xl hover:bg-green-600 
                            hover:text-white disabled:bg-green-700 disabled:text-white 
                            disabled:opacity-80"
                        >{loading ? 'Uploading...' : 'Upload'}</button>
                    </div>
                    {/* UPLOAD IMAGE SYSTEM END */}
                    <p className="text-red-600">{imageUploadError && imageUploadError}</p>
                    {
                        formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                            <div key={url} className="p-3 rounded-lg border border-gray-300 my-3 flex justify-between items-center">
                                <img src={url} alt="listing image" className="w-30 h-20 object-contain rounded-lg" />
                                <button
                                    type="button"
                                    onClick={() => handleDeleteImage(index)}
                                    className="p-3 border border-red-700 text-red-700 
                                    uppercase hover:shadow-xl hover:bg-red-700 hover:text-white"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    }
                    {/* CREATE BUTTON */}
                    <button
                        type="submit"
                        disabled={submitLoading || loading}
                        className="uppercase p-3 bg-slate-700 text-white 
                    rounded-lg hover:opacity-95 disabled:opacity-80">
                        {submitLoading ? 'creating...' : 'create listing'}
                    </button>
                    {submitError && <p className="text-red-700 text-sm">{submitError}</p>}
                </div>
                {/* BOTTOM | RIGHT END*/}
            </form>
        </main>
    )
}

export default CreateListing