/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    //console.log(formData)
  };

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

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',

      });

      const data = res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
      navigate('/sign-in');
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      const res = await fetch('/api/auth/sign-out');
      const data = res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message))
        return;
      }

      dispatch(signOutUserSuccess(data));
      navigate('/sign-in');
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  }

  return (
    <div className="w-full">
      <div className="w-[90%] sm:max-w-lg mx-auto flex flex-col mb-7">
        <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mb-5 gap-5 mx-auto w-full"
        >
          {/* Image Upload */}
          <input
            className="hidden" // Make the input completely hidden and not affect layout
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <img
            onClick={() => fileRef.current.click()}
            className="h-24 w-24 rounded-full object-cover self-center cursor-pointer mt-2"
            src={formData?.avatar || currentUser.avatar}
            alt="Profile image"
          />
          <p className="text-center">
            {fileUploadError ? (
              <span className="text-red-700">Error during Image upload! Image must be less than 1MB</span>
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
            {loading ? "Loading..." : "Update"}
          </button>
        </form>
        <Link to={'/create-listing'}>
          <p className="p-3 uppercase text-center mb-5 text-white bg-green-600 rounded-lg">Create Listing</p>
        </Link>
        <div className="flex mx-auto w-full justify-between">
          <span
            onClick={handleDeleteUser}
            className="text-white p-3 bg-red-700 cursor-pointer rounded-lg"
          >
            Delete Account
          </span>
          <span onClick={handleSignOut} className="text-white p-3 bg-yellow-500 cursor-pointer rounded-lg">
            Sign Out
          </span>
        </div>
        <p className="text-center">
          {error ? <span className="text-red-600">{error}</span> : ""}
        </p>
        <p className="text-green-600 text-center">
          {updateSuccess ? "Profile updated!" : ""}
        </p>
      </div>
    </div>
  );
};

export default Profile;
