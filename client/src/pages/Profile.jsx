import { useSelector } from 'react-redux';
import { useRef } from 'react';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  return (
    <div className="w-full">
      <div className="w-[90%] sm:max-w-lg mx-auto flex flex-col ">
        <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
        <form className="flex flex-col mb-5 gap-5 mx-auto w-full">
          {/* Image Upload */}
          <input
            className="hidden" // Make the input completely hidden and not affect layout
            ref={fileRef}
            type="file"
          />
          <img
            onClick={() => fileRef.current.click()}
            className="h-24 w-24 rounded-full object-cover self-center cursor-pointer mt-2"
            src={currentUser.avatar}
            alt="Profile image"
          />

          {/* Input fields */}
          <input
            type="text"
            placeholder="Username"
            className="rounded-lg p-3 w-full"
            id="username"
            value={currentUser.username}
          />
          <input
            type="email"
            placeholder="Email"
            className="rounded-lg p-3 w-full"
            id="email"
            value={currentUser.email}
          />
          <input
            type="password"
            placeholder="Password"
            className="rounded-lg p-3 w-full"
            id="password"
          />

          {/* Update button */}
          <button
            type="submit"
            className="bg-slate-700 text-white rounded-lg p-3 uppercase w-full hover:opacity-95 disabled:opacity-80"
          >
            Update
          </button>
        </form>
        <div className="flex mx-auto w-full justify-between">
          <span className="text-red-700 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">Sign Out</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
