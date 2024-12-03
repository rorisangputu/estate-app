import React from 'react'

const Header = () => {
    return (
        <header className='bg-slate-200 shadow-md '>
            <div className='w-[90%] mx-auto flex justify-between items-center pt-3 pb-3'>
                <div>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap gap-1'>
                        <span className='text-slate-500'>Bright</span>
                        <span className='text-slate-700'>Estates</span>
                    </h1>
                </div>
                <div>
                    <form action="" className='bg-slate-100 p-3 rounded-lg'>
                        <input type="text" className='bg-transparent' placeholder='Search' name="" id="" />

                    </form>
                </div>
            </div>
        </header>
    )
}

export default Header