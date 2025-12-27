import { v2 as cloudinary } from "cloudinary";
import carouselModel from "../models/carouselModel.js";

// ✅ Add New Carousel Slide
const addSlide = async (req, res) => {
    try {
        const imageFile = req.file;
        const { title, link } = req.body;

        if (!imageFile) {
            return res.json({ success: false, message: "Image is required" });
        }

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
        
        const slideData = {
            image: imageUpload.secure_url,
            title,
            link,
            date: Date.now()
        };

        const slide = new carouselModel(slideData);
        await slide.save();

        res.json({ success: true, message: "Slide Added Successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ✅ Get All Slides for Frontend
const getSlides = async (req, res) => {
    try {
        const slides = await carouselModel.find({});
        res.json({ success: true, slides });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ✅ Delete a Slide
const removeSlide = async (req, res) => {
    try {
        await carouselModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Slide Removed" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { addSlide, getSlides, removeSlide };