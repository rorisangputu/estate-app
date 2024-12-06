import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice.js'

const OAuth = () => {
    const dispatch = useDispatch();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL })
            });

            const data = await res.json();
            dispatch(signInSuccess(data))
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