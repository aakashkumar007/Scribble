import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleDoubleDown } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Price';
import { gsap } from 'gsap';
import { IoCartOutline } from "react-icons/io5";
import { useCart } from '../context/Cart';

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/category/get-category');
        if (data.success) {
          setCategories(data.category);
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
      }
    };

    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:4000/api/product/product-list/${page}`);
        setLoading(false);
        setProducts(data.products);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    if (!checked.length || !radio.length) getAllProduct();
  }, [checked, radio, page]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/api/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:4000/api/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let allChecked = [...checked];
    if (value) {
      allChecked.push(id);
    } else {
      allChecked = allChecked.filter((item) => item !== id);
    }

    setChecked(allChecked);
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post('http://localhost:4000/api/product/product-filter', { checked, radio });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const addToCart = (product) => {
    const userId = auth?.user?._id;
    if (!userId) {
      toast.error("You need to be logged in to add items to the cart");
      navigate('/signin');
      return;
    }
    const cartKey = `cart_${userId}`;
    const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const newProduct = { ...product, uniqueId: Date.now() }; // Adding uniqueId
    const updatedCart = [...storedCart, newProduct];
    setCart(updatedCart);
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    toast.success("Item Added to cart");
  };

  return (
    <div className="container mx-auto px-4 bg-gray-50">
      <div className="flex flex-wrap">
        {/* Filter By Category */}
        <div className="w-full sm:w-1/6 p-4 bg-white shadow-md rounded-md">
          <h3 className="font-semibold mb-4 text-gray-800">Filter By Category</h3>
          <div className="flex flex-col">
            {categories.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)} className="mb-2">
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/* Price Filter */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2 text-gray-800">Filter By Price</h3>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 p-2 bg-red-500 text-white font-semibold rounded-md uppercase cursor-pointer"
          >
            Reset Filter
          </button>
        </div>

        {/* Product Display */}
        <div className="w-full sm:w-5/6 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
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
                  <p
                    onClick={() => navigate(`moredetail/${product.slug}`)}
                    className="text-blue-500 hover:underline cursor-pointer flex items-center"
                  >
                    More details
                    <FaAngleDoubleDown className="ml-1 text-blue-500 mt-1 pt-1" />
                  </p>
                  <button onClick={() => addToCart(product)} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
                    <IoCartOutline className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          {products.length < total && (
            <div className="text-center mt-8">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
