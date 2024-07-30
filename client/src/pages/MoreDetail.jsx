import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { gsap } from 'gsap';

const MoreDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/product/get-single-product/${slug}`);
        setProduct(data.product);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [slug]);

  useEffect(() => {
    if (product) {
      gsap.fromTo('.product-card', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
    }
  }, [product]);

  const handleAddToCart = () => {
    // Handle add to cart functionality
    console.log('Added to cart:', product.name);
  };

  const handleBuyNow = () => {
    // Handle buy now functionality
    console.log('Buy now:', product.name);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="product-card max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
          <h1 className="text-3xl font-bold text-white">{product.name}</h1>
        </div>
        <div className="p-4">
          <img
            src={`http://localhost:4000/api/product/get-product-photo/${product._id}`}
            alt={product.name}
            className="w-full h-64 object-cover mb-4 rounded-lg"
          />
          <p className="text-2xl text-gray-800 font-semibold mb-4">Price: ₹{product.price}</p>
          <p className="text-gray-700 text-base mb-4">{product.description}</p>
          <p className={`text-lg ${product.shipping ? 'text-green-600' : 'text-red-600'} mb-4`}>
            {product.shipping ? 'Shipping Available' : 'Shipping Not Available'}
          </p>
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition-transform transform hover:scale-105"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreDetail;
