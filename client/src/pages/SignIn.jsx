import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';

const SignIn = () => {
    const [formData, setFormData] = useState({})
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Handles changing state of inputs and stores to Form state variable
    const handleChange = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    }

    //console.log(formData)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(signInStart());
            const response = await fetch('/api/auth/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            dispatch(signInFailure(error.message))
        }

    }

    return (
        <div className="">
            <div className="max-w-lg mx-auto p-3">
                <h1 className="text-3xl text-center font-semibold my-7" > Sign In</h1>
                <form onSubmit={handleSubmit} action="" className="flex flex-col mb-7 gap-3  mx-auto">
                    <input type="text" placeholder="Email" className="border p-3 rounded-lg" id="email" onChange={handleChange} />
                    <input type="text" placeholder="Password" className="border p-3 rounded-lg" id="password" onChange={handleChange} />
                    <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase 
                        hover:opacity-95 cursor-pointer disabled:bg-slate-500"
                    >
                        {loading ? "Loading..." : "Sign In"}
                    </button>
                    <button disabled={loading} className="uppercase bg-red-700 p-3 text-white rounded-lg cursor-pointer
                        hover:opacity-95 disabled:opacity-80"
                    >
                        Sign in with Google
                    </button>
                </form>
                <p>Create an account: <span className="text-blue-500 cursor-pointer hover:underline"> <Link disabled={loading} to={'/sign-up'}>Sign Up</Link></span></p>
                {error && <p className='text-red-600 mt-5'>{error}</p>}

            </div >
        </div >
    )
}

export default SignIn