import { v2 as cloudinary } from "cloudinary";
import marqueeModel from "../models/marqueeModel.js";

// Get active marquee (public)
const getMarquee = async (req, res) => {
    try {
        let marquee = await marqueeModel.findOne({ isActive: true }).sort({ updatedAt: -1 });
        
        // Create default if none exists
        if (!marquee) {
            marquee = await marqueeModel.create({
                text: '🎉 Welcome to SEng — Premium Gifts & Decor | Free Shipping on orders above Rs.499 | 🛍️ New Collections Every Week!',
                isActive: true
            });
        }

        res.json({ success: true, marquee });
    } catch (error) {
        console.error('getMarquee error:', error);
        res.json({ success: false, message: error.message });
    }
};

// Update marquee text and/or image (admin only)
const updateMarquee = async (req, res) => {
    try {
        const { text } = req.body;
        const imageFile = req.file;

        let imageUrl = '';
        if (imageFile) {
            const result = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            imageUrl = result.secure_url;
        }

        // Deactivate all existing marquees
        await marqueeModel.updateMany({}, { $set: { isActive: false } });

        // Create new active one
        const updateData = { text, isActive: true, updatedAt: Date.now() };
        if (imageUrl) updateData.imageUrl = imageUrl;

        const newMarquee = await marqueeModel.create(updateData);
        res.json({ success: true, message: 'Marquee updated', marquee: newMarquee });

    } catch (error) {
        console.error('updateMarquee error:', error);
        res.json({ success: false, message: error.message });
    }
};

// Toggle marquee on/off (admin only)
const toggleMarquee = async (req, res) => {
    try {
        const { id, isActive } = req.body;
        await marqueeModel.findByIdAndUpdate(id, { isActive });
        res.json({ success: true, message: `Marquee ${isActive ? 'activated' : 'deactivated'}` });
    } catch (error) {
        console.error('toggleMarquee error:', error);
        res.json({ success: false, message: error.message });
    }
};

// Get all marquees (admin only)
const getAllMarquees = async (req, res) => {
    try {
        const marquees = await marqueeModel.find({}).sort({ updatedAt: -1 });
        res.json({ success: true, marquees });
    } catch (error) {
        console.error('getAllMarquees error:', error);
        res.json({ success: false, message: error.message });
    }
};

export { getMarquee, updateMarquee, toggleMarquee, getAllMarquees };
