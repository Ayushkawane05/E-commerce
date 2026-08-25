import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// ✅ Add Product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller, quantity } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            quantity: Number(quantity), // ✅ Added quantity
            date: Date.now()
        };

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product Added" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ List All Products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ Remove Product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ Get Single Product Info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ Update Product Quantity
const updateQuantity = async (req, res) => {
    try {
        const { id, quantity } = req.body;

        if (!id || quantity === undefined) {
            return res.json({ success: false, message: 'Product ID and quantity are required' });
        }

        await productModel.findByIdAndUpdate(id, { quantity });

        res.json({ success: true, message: 'Quantity updated successfully' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ Semantic Search Products
const searchProducts = async (req, res) => {
    try {
        const { q = '' } = req.query;
        if (!q.trim()) {
            const all = await productModel.find({}).limit(20);
            return res.json({ success: true, products: all });
        }

        let products = [];

        // Try MongoDB full-text search first
        try {
            products = await productModel.find(
                { $text: { $search: q } },
                { score: { $meta: 'textScore' } }
            ).sort({ score: { $meta: 'textScore' } }).limit(20);
        } catch (_) {}

        // Fuzzy regex fallback if no text-index results
        if (products.length === 0) {
            const regex = new RegExp(q.split('').join('.*'), 'i');
            products = await productModel.find({
                $or: [
                    { name: { $regex: regex } },
                    { description: { $regex: new RegExp(q, 'i') } },
                    { category: { $regex: new RegExp(q, 'i') } },
                    { subCategory: { $regex: new RegExp(q, 'i') } }
                ]
            }).limit(20);
        }

        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addProduct, listProducts, removeProduct, singleProduct, updateQuantity, searchProducts };

