import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import Loader from '../../components/Loader/Loader';

export default function Cart() {
  const { cartItems, addProductToCart, clearCart, loading, error } = useContext(cartContext);
  const [showAddress, setShowAddress] = useState(false);

  const removeItem = (productId) => {
    addProductToCart(productId, 0);
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.02;
    return (subtotal + tax).toFixed(2);
  };

  return (
    <>
      {loading && <Loader/>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && !error && (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
          <div className="flex-[7] max-w-4xl">
            <h1 className="text-3xl font-medium mb-6">
              Shopping Cart
              <span className="text-sm text-txtColor">{cartItems.length} items</span>
            </h1>

            <button
              onClick={clearCart}
              className="mb-4 bg-red-400 text-white py-2 px-3 rounded hover:bg-red-500"
            >
                clear cart
            </button>

            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500"> cart empty</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[3fr_0.5fr_0.5fr] text-gray-500 border-b-1 border-gray-300 py-5 items-center text-sm md:text-base font-medium pt-3"
                >
                  <div className="flex items-center md:gap-6 gap-3">
                    <div className="w-24 h-24 flex items-center justify-center  overflow-hidden">
                      <img className="max-w-full h-full object-contain" src={item.image} alt={item.title} />
                    </div>
                    <div className="space-y-3">
                      <Link to={`/productDetails/${item.id}`} className="hidden md:block font-semibold">
                        {item.title}
                      </Link>
                      <p className="text-sm text-txtColor">{item.category}</p>
                      <p className="text-sm">Rate: {item.rating.rate}</p>
                      <p className="text-sm">Price: ${item.price}</p>
                    </div>
                  </div>
                  <p className="text-center">${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeItem(item.id)} className="cursor-pointer mx-auto">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                        stroke="#FF532E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              ))
            )}

            <Link
              to={'/products'}
              className="group cursor-pointer flex items-center mt-8 gap-2 text-secondaryColor font-medium"
            >
              <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
                  stroke="#615fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              continue shopping
            </Link>
          </div>


            {/* order summary */}
          <div className="flex-[3] max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
            <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
            <hr className="border-gray-300 my-5" />

            <div className="mb-6">
              <p className="text-sm font-medium uppercase"> Address</p>
              <div className="relative flex justify-between items-start mt-2">
                <p className="text-gray-500">Address is not found</p>
                <button
                  onClick={() => setShowAddress(!showAddress)}
                  className="text-indigo-500 hover:underline cursor-pointer"
                >
                  change
                </button>
                {showAddress && (
                  <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                    <p onClick={() => setShowAddress(false)} className="text-gray-500 p-2 hover:bg-gray-100">
                      cairo,Egypt
                    </p>
                    <p
                      onClick={() => setShowAddress(false)}
                      className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10"
                    >
                      Add Address
                    </p>
                  </div>
                )}
              </div>

              <p className="text-sm font-medium uppercase mt-6">Payment way</p>
              <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                <option value="COD">Cash</option>
                <option value="Online">Online </option>
              </select>
            </div>

            <hr className="border-gray-300" />

            <div className="text-gray-500 mt-4 space-y-2">
              <p className="flex justify-between">
                <span>price</span>
                <span>${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>delievery</span>
                <span className="text-green-600">free</span>
              </p>
              <p className="flex justify-between">
                <span>tax (2%)</span>
                <span>
                  ${(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.02).toFixed(2)}
                </span>
              </p>
              <p className="flex justify-between text-lg font-medium mt-3">
                <span>Total:</span>
                <span>${calculateTotal()}</span>
              </p>
            </div>

            <button className="w-full py-3 mt-6 cursor-pointer bg-secondaryColor text-white font-medium hover:bg-primaryColor transition">
              Check Out
            </button>
          </div>
        </div>
      )}
    </>
  );
}