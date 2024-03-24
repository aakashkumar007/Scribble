import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control p-1 rounded-md"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
           <button type="submit" className="bg-purple-500 text-white ml-2 font-semibold p-1 rounded-md ">
          Submit
        </button>
        </div>

       
      </form>
    </>
  );
};

export default CategoryForm;