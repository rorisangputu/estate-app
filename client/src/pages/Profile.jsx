import { useSelector } from 'react-redux';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="w-full">
      <div className="max-w-lg mx-auto flex flex-col ">
        <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
        <form className='flex flex-col mb-5 gap-5 mx-auto'>
          <img className='h-24 w-24 rounded-full object-cover self-center cursor-pointer mt-2' src={currentUser.avatar} alt="" />
          <input type="text" placeholder='Username' className='rounded-lg p-3' id='username' value={currentUser.username} />
          <input type="email" placeholder='Email' className='rounded-lg p-3' id='email' value={currentUser.email} />
          <input type="password" placeholder='Password' className='rounded-lg p-3' id='password' />
          <input className='bg-white rounded-lg p-3' type="file" />
          <button type='submit' className='bg-slate-700 text-white rounded-lg p-3 uppercase 
          hover:opacity-95 disabled:opacity-80'>Update</button>
        </form>
        <div className='flex mx-auto w-[70%] justify-between'>
          <span className='text-red-700 cursor-pointer'>Delete Account</span>
          <span className='text-red-700 cursor-pointer'>Signt Out</span>
        </div>
      </div>
    </div>
  )
}

export default Profile