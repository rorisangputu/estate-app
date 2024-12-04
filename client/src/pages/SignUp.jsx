import { Link } from 'react-router-dom'

const SignUp = () => {
    return (
        <div className="">
            <div className="max-w-lg mx-auto p-3">
                <h1 className="text-3xl text-center font-semibold my-7" > Sign Up</h1>
                <form action="" className="flex flex-col mb-7 gap-3  mx-auto">
                    <input type="text" placeholder="Username" className="border p-3 rounded-lg" id="username" />
                    <input type="text" placeholder="Email" className="border p-3 rounded-lg" id="email" />
                    <input type="text" placeholder="Password" className="border p-3 rounded-lg" id="password" />
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
                    <p>Have an account? <span className="text-blue-500 cursor-pointer hover:underline"> <Link to={'/sign-in'}>Sign In</Link></span></p>
                </form>
            </div >
        </div >
    )
}

export default SignUp