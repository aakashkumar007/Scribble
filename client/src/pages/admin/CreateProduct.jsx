import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { Link, useNavigate } from "react-router-dom"; // Import Link
const { Option } = Select;

const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");

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

    //create product function
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("shipping", shipping ? "1" : "0");
            productData.append("category", category);
            const { data } = await axios.post(
                "http://localhost:4000/api/product/create-product",
                productData
            );

            if (data?.success) {
                toast.success("Product Created Successfully");
                // navigate("/dashboard/admin"); // Navigate after successful creation
            } else {
                toast.info(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <>
            <h2 className='p-3 inline-block mt-4 ml-2 font-bold bg-teal-500 text-white font-mono uppercase'>create product</h2>
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
                                    required
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
                            {photo && (
                                <div className="text-center">
                                    <img
                                        src={URL.createObjectURL(photo)}
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
                            required
                            placeholder="Write a name"
                            className="form-input mb-3 rounded-md w-full"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <textarea
                            value={description}
                            required
                            placeholder="Write a description"
                            className="form-textarea mb-3 rounded-md w-full h-32"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            type="number"
                            value={price}
                            required
                            placeholder="Write a price"
                            className="form-input mb-3 rounded-md w-full"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            required
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
                                setShipping(value);
                            }}
                        >
                            <Option value="0">No</Option>
                            <Option value="1">Yes</Option>
                        </Select>
                        <button
                            className="py-2 px-6 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={handleCreate}
                        >
                            CREATE PRODUCT
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateProduct;
