import { FaSearch } from 'react-icons/fa'
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='bg-slate-200 shadow-md '>
            <div className='w-[90%] mx-auto flex justify-between items-center pt-3 pb-3'>
                <div>
                    <Link to={'/'}>
                        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap gap-1'>
                            <span className='text-slate-500'>Bright</span>
                            <span className='text-slate-700'>Estates</span>
                        </h1>
                    </Link>
                </div>
                <div>
                    <form action="" className='bg-slate-100 p-3 rounded-lg flex items-center'>
                        <input type="text" className='bg-transparent focus:outline-none w-24 sm:w-64' placeholder='Search...' name="" id="" />
                        <FaSearch className='text-slate-600' />
                    </form>
                </div>
                <div>
                    <ul className='justify-between hidden md:flex gap-4'>
                        {links.map((link, i) => (
                            <Link to={link.href} className='text-slate-700 hover:underline cursor-pointer' key={i}>{link.link}</Link>
                        ))}
                    </ul>
                    <div className='md:hidden'>
                        <GiHamburgerMenu className='h-7 w-7 cursor-pointer text-slate-700' />
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
    {
        link: 'Sign In',
        href: '/sign-in'
    },
]