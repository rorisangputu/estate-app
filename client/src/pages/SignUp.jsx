import { useState } from 'react'
import { Link, redirect } from 'react-router-dom'

const SignUp = () => {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        try {
            const response = await fetch('/api/auth/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            console.log(data)
        } catch (error) {
            console.log(error);
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
                    <button className="bg-slate-700 text-white p-3 rounded-lg uppercase 
                        hover:opacity-95 cursor-pointer disabled:opacity-80"
                    >
                        Sign Up
                    </button>
                    <button className="uppercase bg-red-700 p-3 text-white rounded-lg cursor-pointer
                        hover:opacity-95 disabled:opacity-80"
                    >
                        Continue with Google
                    </button>
                </form>
                <p>Have an account? <span className="text-blue-500 cursor-pointer hover:underline"> <Link to={'/sign-in'}>Sign In</Link></span></p>

            </div >
        </div >
    )
}

export default SignUp