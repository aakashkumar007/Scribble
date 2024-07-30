import React, { useEffect } from 'react';
import { useCart } from '../context/Cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router';
import { gsap } from 'gsap';
import axios from 'axios';

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.token) {
      navigate('/signin');
    } else {
      const cartKey = `cart_${auth.user._id}`;
      const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
      console.log(`Fetched cart for user ${auth.user._id}:`, storedCart);
      setCart(storedCart);
    }
  }, [auth, navigate, setCart]);

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR"
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (uniqueId) => {
    try {
      const updatedCart = cart.filter(product => product.uniqueId !== uniqueId);
      setCart(updatedCart);
      const cartKey = `cart_${auth.user._id}`;
      localStorage.setItem(cartKey, JSON.stringify(updatedCart)); // Update local storage

      if (auth?.token) {
        await axios.put(`/api/cart/${auth.user._id}`, { items: updatedCart });
      }
    } catch (error) {
      console.error("Error deleting item from cart", error);
    }
  };

  return (
    <>
      <h1 className='text-center text-2xl font-bold my-4'>
        {`Hello ${auth?.token && auth?.user?.name}`}
      </h1>

      <div className='flex justify-center mb-4'>
        <h4 className='text-lg font-medium'>
          {
            cart.length > 0 ?
              `Total Items: ${cart.length}` : `No Items in Cart ${auth?.token ? "" : "Please Login"}`
          }
        </h4>
      </div>

      <div className="w-full sm:w-5/6 p-4 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cart?.map((product) => (
            <div
              key={product.uniqueId}
              className={`bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 card-${product._id}`}
              onMouseEnter={() => gsap.to(`.card-${product._id}`, { rotationY: 15, duration: 0.3, ease: "power3.out", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" })}
              onMouseLeave={() => gsap.to(`.card-${product._id}`, { rotationY: 0, duration: 0.3, ease: "power3.out", boxShadow: "0 5px 15px rgba(0,0,0,0.2)" })}
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={`http://localhost:4000/api/product/get-product-photo/${product._id}`}
                  className="w-full h-48 object-cover object-center mb-4 transition-transform duration-300 hover:scale-105"
                  alt={product.name}
                />
              </div>
              <h2 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h2>
              <div className="flex items-center justify-between">
                <p className="text-gray-700 font-semibold mb-2">Price: ₹ {product.price}</p>
              </div>
              <p className="text-gray-700 font-semibold mb-2">{product?.shipping ? 'Shipping Available' : 'Shipping Not Available'}</p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleDelete(product.uniqueId)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-center m-4'>
        <div className='flex-col'>
          <div className='flex justify-center'>
            <h1 className='text-blue-700'>Cart Summary</h1>
          </div>
          <div className='flex justify-center'>
            <h1 className='text-lg font-extrabold'>
              <h2>Total Amount to Pay</h2>
              {totalPrice()}
            </h1>
          </div>
        </div>
      </div>

      {cart.length > 0 && (
        <div className='flex justify-center mt-8'>
          <button
            onClick={() => navigate('/checkout')}
            className="bg-green-500 text-white px-4 py-2 rounded-md mx-2 hover:bg-green-600 transition"
          >
            Checkout
          </button>
          <button
            onClick={() => navigate('/payment')}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mx-2 hover:bg-blue-600 transition"
          >
            Payment
          </button>
        </div>
      )}
    </>
  );
};

export default CartPage;
