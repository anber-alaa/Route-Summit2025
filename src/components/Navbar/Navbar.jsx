import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { cartContext } from '../../Context/CartContext'

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const { cartCount } = useContext(cartContext)
    
    return (
    <>
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4  bg-mainColor relative transition-all">

            <NavLink to={'/products'} className='flex items-center justify-center gap-2'>
                <img src={logo} alt="logo" className='w-full' />
                <h1 className='font-semibold text-2xl'>Allvero</h1>
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to={'/products'} className='font-medium'>Products</NavLink>

                <NavLink to={'/cart'} className="relative cursor-pointer">
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#B9375D" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-secondaryColor w-[18px] h-[18px] rounded-full">
                        {cartCount}
                    </button>
                </NavLink>

            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink to={'/products'} className="block">Products</NavLink>
                <NavLink to={'/login'} className="cursor-pointer px-6 py-2 mt-2 bg-secondaryColor hover:bg-primaryColor transition text-white rounded-full text-sm">
                    Login
                </NavLink>
            </div>
        </nav>
    </>
  )
}
