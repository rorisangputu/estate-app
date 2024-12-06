import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';

const OAuth = () => {

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            console.log(result)
        } catch (error) {
            console.log('Could not sign in with Google', error)
        }
    }
    return (
        <button onClick={handleGoogleClick} type="button" className="uppercase bg-red-700 p-3 text-white rounded-lg cursor-pointer
                        hover:opacity-95 disabled:opacity-80"
        >
            Sign in with Google
        </button>
    )
}

export default OAuth