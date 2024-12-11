import { FaSearch } from 'react-icons/fa'
// import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Header = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/get?${searchQuery}`);
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);

    return (
        <header className='bg-slate-200 shadow-md '>
            <div className='w-[90%] mx-auto flex justify-between items-center pt-3 pb-3'>

                {/* LOGO */}
                <div>
                    <Link to={'/'}>
                        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap gap-1'>
                            <span className='text-slate-500'>Bright</span>
                            <span className='text-slate-700'>Estates</span>
                        </h1>
                    </Link>
                </div>

                {/* SEARCH BAR */}
                <div>
                    <form onSubmit={handleSearch} className='bg-slate-100 p-3 rounded-lg flex items-center'>
                        <input type="text"
                            className='bg-transparent focus:outline-none w-24 sm:w-64'
                            placeholder='Search...'
                            name="" id=""
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button>
                            <FaSearch className='text-slate-600' />
                        </button>
                    </form>
                </div>

                {/* NAV LINKS */}
                <div>
                    <ul className='justify-between hidden md:flex gap-4 items-center'>
                        {links.map((link, i) => (
                            <Link to={link.href} className='text-slate-700 hover:underline cursor-pointer' key={i}>{link.link}</Link>
                        ))}
                        {currentUser ?
                            (
                                <Link to={'/profile'}>
                                    <img className='h-10 w-10 rounded-full object-cover' src={currentUser.avatar} alt="profile " />
                                </Link>
                            )
                            :
                            (
                                <Link
                                    to={'/sign-in'}
                                    className='text-slate-700 hover:underline cursor-pointer'
                                >
                                    Sign In
                                </Link>
                            )
                        }
                    </ul>
                    <div className='md:hidden'>
                        {currentUser && <Link to={'/profile'}>
                            <img className='h-10 w-10 rounded-full object-cover' src={currentUser.avatar} alt="profile " />
                        </Link>}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header

const links = [
    {
        link: 'Home',
        href: '/'
    },
    {
        link: 'About',
        href: '/about'
    },
    {
        link: 'Profile',
        href: '/profile'
    },

]