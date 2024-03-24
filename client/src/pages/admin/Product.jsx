import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'; // Import Link
import CreateProduct from './CreateProduct';
import UpdateProduct from './UpdateProduct';

const Product = () => {
  const [products, setProducts] = useState([]);

  const getAllProduct = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/product/get-product");
      setProducts(response.data.products);
    } catch (error) {
      console.log(error, "Error in getting product");
      toast.error("Error in getting product");
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <>
      <div className='font-bold text-white bg-slate-500 text-center text-xl p-3 mt-4 uppercase'>
        Manage Product
      </div>
      <CreateProduct />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.map(product => (
          <Link  style={{ textDecoration: 'none' }}  key={product._id} to={`update-product/${product.slug}`}> {/* Wrap card content in Link */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={`http://localhost:4000/api/product/get-product-photo/${product._id}`}
                  className="w-40 h-48 object-cover object-center mb-4"
                  alt={product.name}
                />
              </div>
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex flex-wrap items-center justify-between">
                <p className="text-gray-700 font-semibold mb-2">Price: ₹ {product.price}</p>
                <p className="text-gray-700 font-semibold mb-2">Quantity: {product.quantity}</p>
                <p className="text-gray-700 font-semibold mb-2">Category: {product.category.name}</p>
              </div>
              <div className="text-gray-700 font-semibold mb-2">{product.shipping ? "Shipping Available" : "Shipping Not Available"}</div>
            </div>
          </Link>
        ))}
      </div>
      {/* <UpdateProduct/> */}
    </>
  );
};

export default Product;
