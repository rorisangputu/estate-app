/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"


const Contact = ({ listing }) => {
    const [landlord, setLandlord] = useState(null);

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

    return (
        <>
            {landlord && (
                <div className="flex flex-col gap-2">
                    <p className="font-semibold text-slate-600">
                        Contact <span>{landlord.username}</span> for  <span>{listing.name}</span>
                    </p>
                    <textarea name="" className="rounded-lg" id=""></textarea>
                </div>
            )}
        </>
    )
}

export default Contact