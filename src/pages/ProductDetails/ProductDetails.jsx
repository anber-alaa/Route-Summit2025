import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function ProductDetails() {
     const { id } = useParams();
    const [isLoading , setIsLoading] = useState(false)
    const [product , setProduct] = useState(null)
    
    async function getProductDetails(){
    try{
      setIsLoading(true);
      let {data} = await axios.get(`https://fakestoreapi.com/products/${id}`)
      setProduct(data)
      setIsLoading(false)
    }catch(err){
    //   setError('error in fetching product details');
      setIsLoading(false);
      console.error(err);
    }
  }
  useEffect(()=>{
    getProductDetails()
  },[id])
  
  
  if(isLoading) return(
    <>
    is loading
    </>
  )
    return (
    <>
        <div className="max-w-6xl w-full my-10 px-6">
            <p>
                <Link to={'/'}>Home</Link> /
                <Link to={'/products'}> Products</Link> /
                <span> {product?.category}</span> /
                <span className="text-secondaryColor"> {product?.title}</span>
            </p>

            <div className="flex flex-col items-center md:flex-row gap-16 mt-4">
                <div className="">
                    <div className="border border-gray-500/30 max-w-70 rounded overflow-hidden">
                        <img src={product?.image} alt="Selected product" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Product Details */}
                <div className="md:w-2/3 w-full py-10 ">
                <p className="text-sm font-bold text-secondaryColor mb-4">{product?.category}</p>
                <h1 className="text-2xl font-bold text-primaryColor mb-2">
                    {product?.title}
                </h1>
                <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                            product?.rating?.rate > i ? (
                                <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" fill="#FFD700" />
                                </svg>
                            ) : (
                                <svg width="14" height="13" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z" fill="#615fff" fill-opacity="0.35" />
                                </svg>
                            )
                        ))}
                        <p className="text-base ml-2">({product?.rating?.rate})</p>
                        <span className="text-sm text-gray-500 ml-2">{product?.rating?.count} reviews </span>
                </div>
                
                <p className="text-sm font-bold text-gray-600 mb-4"> <span className='text-txtColor'>Available</span></p>
                <p className="text-md font-medium text-gray-500 mb-4">
                    {product?.description}
                </p>
                
                
                <div className="flex items-center justify-between mb-4">
                    <div>
                    <span className="text-xl font-bold text-gray-900">{product?.price} LE</span>
                    <span className="ml-2 text-sm font-medium text-gray-500 line-through">{product?.price+200} LE</span>
                    </div>
                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">Save 10%</span>
                </div>
                <p className="text-green-600 text-sm font-semibold mb-4">Free Delivery</p>
                <div className="flex space-x-4">
                    <button
                    className="flex cursor-pointer hover:bg-primaryColor bg-secondaryColor text-xl text-white font-semibold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>

                    </button>
                    <button
                    className="flex gap-2 cursor-pointer bg-gray-300 hover:bg-gray-300 text-gray-800 text-md font-semibold py-2 px-3 rounded-lg focus:outline-none focus:shadow-outline transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>

                    Add to Cart
                    </button>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}
