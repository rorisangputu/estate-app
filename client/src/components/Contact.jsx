/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import { Link } from "react-router-dom";


const Contact = ({ listing }) => {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                if (data.success === false) {
                    return;
                }
                setLandlord(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchLandlord();
    }, [listing.userRef]);

    const onMessageChange = (e) => {
        setMessage(e.target.value);
    }

    return (
        <>
            {landlord && (
                <div className="flex flex-col gap-4">
                    <p className="font-semibold text-slate-600">
                        Contact <span>{landlord.username}</span> for  <span>{listing.name}</span>
                    </p>
                    <textarea name="message"
                        placeholder="Write a message to the landlord"
                        className="rounded-lg p-2" id="message"
                        rows={4}
                        value={message}
                        onChange={onMessageChange}
                    >
                    </textarea>
                    <Link
                        to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
                        className="p-3 bg-slate-700 text-white rounded-lg text-center"
                    >
                        Send Message
                    </Link>
                </div >
            )}
        </>
    )
}

export default Contact