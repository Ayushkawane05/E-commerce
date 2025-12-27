import express from 'express';
import { addProduct, listProducts, removeProduct, singleProduct, updateQuantity } from '../controllers/productController.js';
import adminAuth from '../middleware/adminAuth.js';
import upload from '../middleware/multer.js';

const productRouter = express.Router();

// Add Product
productRouter.post('/add', adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addProduct);

// Remove Product
productRouter.post('/remove', adminAuth, removeProduct);

// Single Product
productRouter.post('/single', singleProduct);

// List Products
productRouter.get('/list', listProducts);

// ✅ Update Quantity Route
productRouter.post('/updateQuantity', adminAuth, updateQuantity);

export default productRouter;
