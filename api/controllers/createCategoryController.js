import slugify from 'slugify'
import categoryModel from '../model/categoryModel.js'
import mongoose from 'mongoose'

export const  createCategoryController = async(req,res) => {
    try {
        const {name} = req.body
        if(!name){
            return res.status(401).send({message: 'Name is required'})
        }

        const existingCategory = await categoryModel.findOne({name})
        if (existingCategory) {
            return res.status(409).json({ message : "Category already exists" })
        }

        const category = await new categoryModel({name,slug:slugify(name)}).save()
        res.status(201).json({
            success:true,
            message:"New category created",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in categoryController"
        })
    }
}

export const updateCategoryController = async(req,res) =>{
    try {
        const {name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message: `Category with id ${id} has been updated`,
            category
        })
      } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in updating Category"
    })
  }

}

export const getAllCategoriesController = async(req,res) =>{
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success:true,
            message: "Categories Retrieved Successfully",
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error in getting all categories",
          });
    }
}

export const singleCategoryController = async(req,res) => {
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})

        res.status(200).send({
            success:true,
            message: 'Single Category Retrieved',
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while getting single category",
            error
        })
    }
}

// export const deleteCategoryController = async(req,res) => {
//     try {
//         const {categoryId} = req.params.id; 
//         const deletedCategory = await categoryModel.findByIdAndDelete(categoryId)
//         res.status(200).send({
//             success:true,
//             message:"Category Deleted Successfully",
//             deletedCategory
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success:false,
//             message:"Error while deleting the category",
//             error
//         })
//     }
// }

export const deleteCategoryController = async (req, res) => {
    try {
        const categoryId = req.params.id; // Corrected line
        // Check if categoryId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).send({
                success: false,
                message: "Invalid categoryId"
            });
        }

        const deletedCategory = await categoryModel.findByIdAndDelete(categoryId);
        
        // Check if the category exists
        if (!deletedCategory) {
            return res.status(404).send({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Category Deleted Successfully",
            deletedCategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting the category",
            error
        });
    }
};
