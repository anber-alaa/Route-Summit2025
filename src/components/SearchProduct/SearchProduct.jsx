import React from 'react'
import { Link } from 'react-router-dom'

export default function SearchProduct({ searchTerm, setSearchTerm }) {
  return (
    <>
      <section className='bg-mainColor rounded-b-3xl container py-3 px-4 flex flex-wrap items-center gap-3'>
        <Link to={'/'} className='flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-200 bg-secondaryColor size-8 rounded-full text-white'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </Link>

        <div className="flex items-center border pl-3 gap-2 bg-white border-gray-300 h-10 rounded-xl overflow-hidden flex-1 min-w-[200px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 30 30" fill="#6B7280">
            <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8"/>
          </svg>
          <input 
            type="search"
            name="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for products"
            className="w-full h-full outline-none text-gray-500 placeholder-gray-500 text-sm"
          />
        </div>
      </section>
    </>
  )
}
