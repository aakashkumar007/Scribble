import express from 'express'
import {requireSignIn,isAdmin} from '../middleware/authMiddleWare.js'
import { createProductController,getProductController,getSingleProductController,productPhotoController,deleteProductController,updateProductController,productFilterController,productCountController,productListController, productListControllerPage} from '../controllers/productController.js'
import formidable from 'express-formidable'


const router=express.Router()

//routes

//create products
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-single-product/:slug", getSingleProductController);

//get photo
router.get("/get-product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//update product
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
  );

  //filter product
  router.post('/product-filter',productFilterController)

  //product count
  router.get('/product-count',productCountController);

  // product-list route definition
router.get('/product-list/:page', productListController);

//category-wise products
router.get('/category-products/:slug', productListControllerPage);



export default router