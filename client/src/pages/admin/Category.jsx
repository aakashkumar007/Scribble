import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import CategoryForm from '../../components/form/CategoryForm';
import { Modal } from 'antd'
import AdminMenu from '../../components/layouts/AdminMenu';

const Category = ( {className=""}) => {
    const [name, setName] = useState("")
    const [categories, setCategories] = useState([]);
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    //
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("http://localhost:4000/api/category/create-category", { name })
            console.log(data);
            if (data.success) {
                toast.success(`${data.category.name} is created`)
                getAllCategory();
            } else {
                toast.error("Something went wrong")
            }
        } catch (error) {
            toast.error("Something went wrong in form")
        }
    }

    // Get all categories 
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

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `http://localhost:4000/api/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            if (data.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Somtihing went wrong");
        }
    };

    //delete category
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(
                `http://localhost:4000/api/category/delete-category/${pId}`
            );
            console.log(data);
            if (data.success) {
                toast.success(`${data.deletedCategory.name} is deleted`);

                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        // Call getAllCategory when component mounts
        getAllCategory();
    }, []); // Passing an empty array as the second argument makes it run only once when the component mounts

    return (
        <>
            <div>
            <div className='font-bold text-white bg-slate-500 text-center text-xl p-3 mt-4 uppercase'>Manage category</div>
                <div>
                <h2 className='p-3 inline-block mt-4 ml-2 font-bold bg-teal-500 text-white font-mono uppercase'>Create Category</h2>
                <div className='p-3'><CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} /></div>
                </div>
                <table className="table-auto w-full bg-white shadow-md rounded-xl">
                    <thead>
                        <tr className="bg-purple-500 text-white">
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((c) => (
                            <tr key={c._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-2 px-4">{c.name}</td>
                                <td className="py-2 px-4">
                                    <button onClick={() => {
                                        setVisible(true); setUpdatedName(c.name);
                                        setSelected(c);
                                    }} className='bg-blue-600 font-mono text-white m-2 p-2 rounded-lg border-2 border-yellow-600'>Edit</button>
                                    <button
                                        onClick={() => {
                                            handleDelete(c._id);
                                        }} className='bg-red-600 font-mono  text-white m-2 p-2 rounded-lg border-2 border-yellow-600'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                visible={visible}
            >
                <CategoryForm
                    value={updatedName}
                    setValue={setUpdatedName}
                    handleSubmit={handleUpdate}
                />
            </Modal>
        </>
    );
};

export default Category;
