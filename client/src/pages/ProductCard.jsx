import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ProductCard = ({ product }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(cardRef.current, 
            { scale: 1 }, 
            { scale: 1.05, duration: 0.3, repeat: -1, yoyo: true }
        );
    }, []);

    return (
        <div 
            ref={cardRef} 
            className="max-w-sm rounded-lg overflow-hidden shadow-lg m-4 transition-transform transform hover:scale-105"
        >
            <img
                src={`http://localhost:4000/api/product/get-product-photo/${product._id}`}
                className="w-full h-48 object-cover object-center mb-4"
                alt={product.name}
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <p className="text-gray-700 text-base">{product.description}</p>
            </div>
            <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                <span className="text-gray-600 font-bold text-lg">${product.price}</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition">
                    Add to Cart
                </button>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className={`text-sm ${product.shipping ? 'text-green-500' : 'text-red-500'}`}>
                    {product.shipping ? 'Free Shipping' : 'Shipping Charges Apply'}
                </span>
            </div>
        </div>
    );
};

export default ProductCard;
