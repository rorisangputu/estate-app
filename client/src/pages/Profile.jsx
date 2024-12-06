/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';


const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
    //console.log(formData)
  }

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData({ ...formData, avatar: downloadURL });
          })
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));

    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }


  }

  return (
    <div className="w-full">
      <div className="w-[90%] sm:max-w-lg mx-auto flex flex-col ">
        <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col mb-5 gap-5 mx-auto w-full">
          {/* Image Upload */}
          <input
            className="hidden" // Make the input completely hidden and not affect layout
            ref={fileRef}
            type="file"
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <img
            onClick={() => fileRef.current.click()}
            className="h-24 w-24 rounded-full object-cover self-center cursor-pointer mt-2"
            src={formData?.avatar || currentUser.avatar}
            alt="Profile image"
          />
          <p className='text-center'>
            {fileUploadError ? (
              <span className="text-red-700">Error during Image upload!</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-600">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-600">Successfully uploaded</span>
            ) : null}
          </p>

          {/* Input fields */}
          <input
            type="text"
            placeholder="Username"
            className="rounded-lg p-3 w-full"
            id="username"
            onChange={handleChange}
            defaultValue={currentUser.username}
          />
          <input
            type="email"
            placeholder="Email"
            className="rounded-lg p-3 w-full"
            id="email"
            onChange={handleChange}
            defaultValue={currentUser.email}
          />
          <input
            type="password"
            placeholder="Password"
            className="rounded-lg p-3 w-full"
            id="password"
            onChange={handleChange}
          />

          {/* Update button */}
          <button
            disabled={loading}
            type="submit"
            className="bg-slate-700 text-white rounded-lg p-3 uppercase w-full hover:opacity-95 disabled:opacity-80"
          >
            {loading ? 'Loading...' : 'Update'}
          </button>
        </form>
        <div className="flex mx-auto w-full justify-between">
          <span className="text-red-700 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">Sign Out</span>
        </div>
        <p className='text-center'>
          {error ? (<span className='text-red-600'>{error}</span>) : ""}
        </p>
      </div>
    </div>
  );
};

export default Profile;
