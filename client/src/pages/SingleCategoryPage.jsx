import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';

const SingleCategoryPage = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState({});
    const { slug } = useParams();

    useEffect(() => {
        if (slug) {
            getProductByCategory();
        }
    }, [slug]);

    const getProductByCategory = async () => {
        try {
            const { data } = await axios.get(`http://localhost:4000/api/product/category-products/${slug}`);
            setCategory(data.category);
            setProducts(data.product);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Showing now: {slug}</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </>
    );
};

export default SingleCategoryPage;
