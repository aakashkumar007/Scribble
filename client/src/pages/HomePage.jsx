import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import axios from 'axios';
import { Link, json } from 'react-router-dom';
import { FaAngleDoubleDown } from "react-icons/fa";
import { toast } from 'react-toastify';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Price';

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked,setChecked] = useState([])
  const [radio,setRadio] = useState([])

  // Get all products and categories when the component mounts.
  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/category/get-category')
        if (data.success) {
          setCategories(data.category)
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong")
      }
    };

    getAllCategory();
  }, []);

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/product/get-product");
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    }

    if(!checked.length|| !radio.length) getAllProduct();
  }, [checked,radio]);

  //filter Handle by category function
  const handleFilter=(value,id)=>{
   let allChecked = [...checked]; 
    if(value){
      allChecked.push(id)
    }else{
      allChecked=allChecked.filter((item)=> item !== id)
    }
    
    setChecked(allChecked)
    }

   //get filter products by price
   const filterProduct = async() => {
    try {
      const {data} = await  axios.post('http://localhost:4000/api/product/product-filter',{checked,radio})
      setProducts(data?.products)
    } catch (error) {
      console.log(error);
    }
   } 

   useEffect(()=>{
    if(checked.length || radio.length )filterProduct();
   },[checked,radio]);

  return (
    <>
      <div className="flex">
     
        {/* Filter By Category */}
        <div className="flex flex-col mr-8">
          <h3 className="font-semibold mb-2">Filter By Category</h3>
          <div className="flex flex-col">
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)} className='mb-2'>
                {c.name}
              </Checkbox>
            ))}
          </div>
          
          {/*Price Filter*/}
          <div className='mt-4 '>
           <h3 className='font-semibold'>Filter By Price</h3>
            <Radio.Group onChange={e=>setRadio(e.target.value)}>
              {
                Prices?.map(p=>(
                  <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))
              }
            </Radio.Group>
          </div>
          <button onClick={()=>{}} className='p-2 min-w-20 m-2 bg-transparent rounded-md  uppercase'>reset filter</button>
        </div>

        {/* Product Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {products.map(product => (
            <Link style={{ textDecoration: 'none' }} key={product._id} to={`update-product/${product.slug}`}>
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
                  <p className="text-gray-700 font-semibold mb-2">Category: {product.category.name}</p>
                </div>
                <div className="text-gray-700 font-semibold mb-2">{product?.shipping ? "Shipping Available" : "Shipping Not Available"}</div>
                <div className='flex'>
                  <p>
                    More Details
                  </p>
                  <FaAngleDoubleDown className='ml-1' />
                  <button className='ml-8 rounded-lg p-2' >Add to Cart</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default HomePage;
