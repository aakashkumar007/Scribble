import express from 'express'
import  { requireSignIn,isAdmin } from '../middleware/authMiddleWare.js'
import { createCategoryController,updateCategoryController,getAllCategoriesController,singleCategoryController,deleteCategoryController } from '../controllers/createCategoryController.js'

const router = express.Router()

//routes
//create category
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

//update Category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//get all categories
router.get('/get-category', getAllCategoriesController)

//single category
router.get('/get-single-category/:slug',singleCategoryController)

//deleter category
router.delete('/delete-category/:id',requireSignIn,isAdmin, deleteCategoryController)

 
export default router