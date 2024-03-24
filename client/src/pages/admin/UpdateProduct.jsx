/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom"; // Import Link
const { Option } = Select;

const UpdateProduct = () => {
    const params = useParams()
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");

    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:4000/api/product/get-single-product/${params.slug}`)
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setCategory(data.product.category._id)
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setPhoto(data.product.photo);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSingleProduct();
    }, [])
    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/api/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in getting category");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    //update product function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category", category);
            productData.append("shipping", shipping);

            const { data } = await axios.put(
                `http://localhost:4000/api/product/update-product/${id}`,
                productData
            );

            if (data?.success) {
                toast.success("Product Updated Successfully");
                navigate("/adminDashboard/admin");
            } else {
                // If there's an error message from the server, show it
                if (data?.message) {
                    toast.error(data.message);
                } else {
                    // If there's no specific error message, show a generic error
                    toast.error("Failed to update product. Please try again later.");
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };


    //delete product
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const { data } = await axios.delete(`http://localhost:4000/api/product/delete-product/${id}`);
                if (data?.success) {
                    toast.success("Product deleted successfully");
                    navigate("/adminDashboard/admin");
                } else {
                    toast.warn(data?.message);
                }
            } catch (error) {
                console.error("Error deleting product:", error);
                toast.error("Something went wrong");
            }
        }
    };

    return (
        <>
            <h2 className='p-3 inline-block mt-4 ml-2 font-bold bg-teal-500 text-white font-mono uppercase'>update product</h2>
            <div className="container mx-auto px-4 py-8">
                <div className="w-full md:w-3/4 flex">
                    <div className="max-w-lg place-items-start">
                        <Select
                            bordered={false}
                            placeholder="Select a category"
                            size="large"
                            showSearch
                            className="form-select mb-3"
                            onChange={(value) => {
                                setCategory(value);
                            }}
                            value={category}
                        >
                            {categories?.map((c) => (

                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>

                            ))}
                        </Select>
                        <div className="mb-3">
                            <label className="block text-gray-700">
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                    className="hidden"
                                />
                                <span className="py-2 px-4 bg-gray-200 rounded cursor-pointer hover:bg-gray-300">
                                    {photo ? photo.name : "Upload Photo"}
                                </span>
                            </label>
                        </div>
                        <div className="mb-3">
                            {photo && photo ? (
                                <div className="text-center">
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt="product_photo"
                                        height={"200px"}
                                        className="object-cover object-center mb-4"
                                    />
                                </div>
                            ) : (
                                <div className="text-center">
                                    <img
                                        src={`http://localhost:4000/api/product/get-product-photo/${id}`}
                                        alt="product_photo"
                                        height={"200px"}
                                        className="object-cover object-center mb-4"
                                    />
                                </div>
                            )}
                        </div>
                        <input
                            type="text"
                            value={name}
                            placeholder="Write a name"
                            className="form-input mb-3 rounded-md w-full"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <textarea
                            value={description}
                            placeholder="Write a description"
                            className="form-textarea mb-3 rounded-md w-full h-32"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            type="number"
                            value={price}
                            placeholder="Write a price"
                            className="form-input mb-3 rounded-md w-full"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            value={quantity}
                            placeholder="Write a quantity"
                            className="form-input mb-3 rounded-md w-full"
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <Select
                            bordered={false}
                            placeholder="Select Shipping "
                            size="large"
                            showSearch
                            className="form-select mb-3"
                            onChange={(value) => {
                                setShipping(value === "1"); // Convert value to boolean
                            }}
                            value={shipping ? "1" : "0"} // Set value based on boolean value
                        >
                            <Option value="0">No</Option>
                            <Option value="1">Yes</Option>
                        </Select>
                        <button
                            className="py-2 px-6 bg-blue-500 text-white rounded hover:bg-blue-600 uppercase"
                            onClick={handleUpdate}
                        >
                            update product
                        </button>

                        <button
                            className="py-2 px-6 bg-red-600 text-white ml-3 rounded uppercase"
                            onClick={handleDelete}
                        >
                            delete product
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateProduct;
