import mongoose from "mongoose";

const marqueeSchema = new mongoose.Schema({
    text: { type: String, required: true, default: '🎉 Welcome to SEng — Premium Gifts & Decor!' },
    imageUrl: { type: String, default: '' },   // optional icon/image URL
    isActive: { type: Boolean, default: true },
    updatedAt: { type: Date, default: Date.now }
});

const marqueeModel = mongoose.models.marquee || mongoose.model('marquee', marqueeSchema);
export default marqueeModel;
