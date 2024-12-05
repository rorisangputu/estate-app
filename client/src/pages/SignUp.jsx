import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
            setLoading(true);
            const response = await fetch('/api/auth/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }
            setLoading(false);
            setError(null);
            navigate('/sign-in')
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }

    }

    return (
        <div className="">
            <div className="max-w-lg mx-auto p-3">
                <h1 className="text-3xl text-center font-semibold my-7" > Sign Up</h1>
                <form onSubmit={handleSubmit} action="" className="flex flex-col mb-7 gap-3  mx-auto">
                    <input type="text" placeholder="Username" className="border p-3 rounded-lg" id="username" onChange={handleChange} />
                    <input type="text" placeholder="Email" className="border p-3 rounded-lg" id="email" onChange={handleChange} />
                    <input type="text" placeholder="Password" className="border p-3 rounded-lg" id="password" onChange={handleChange} />
                    <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase 
                        hover:opacity-95 cursor-pointer disabled:bg-slate-500"
                    >
                        {loading ? "Loading..." : "Sign Up"}
                    </button>
                    <button disabled={loading} className="uppercase bg-red-700 p-3 text-white rounded-lg cursor-pointer
                        hover:opacity-95 disabled:opacity-80"
                    >
                        Continue with Google
                    </button>
                </form>
                <p>Have an account? <span className="text-blue-500 cursor-pointer hover:underline"> <Link disabled={loading} to={'/sign-in'}>Sign In</Link></span></p>
                {error ? <p className='text-red-600 mt-5'>{error.message}</p> : <></>}
            </div >
        </div >
    )
}

export default SignUp