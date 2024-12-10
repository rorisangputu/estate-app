/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"


const Contact = ({ listing }) => {
    const [landlord, setLandlord] = useState(null);

    useEffect(() => {

    }, [listing.userRef]);

    return (
        <div className="flex flex-col">
            <p>Contact</p>
            <textarea className="rounded-lg" name="" id=""></textarea>
        </div>
    )
}

export default Contact