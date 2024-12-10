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
        <div className="flex flex-col">
            <p>Contact</p>
            <textarea className="rounded-lg" name="" id=""></textarea>
        </div>
    )
}

export default Contact