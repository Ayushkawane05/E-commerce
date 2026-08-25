import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String },
    tag: { type: String },   // e.g., "LATEST ARRIVALS"
    link: { type: String },  // Optional: Redirect to /collection
    date: { type: Number, required: true }
});

const carouselModel = mongoose.models.carousel || mongoose.model("carousel", carouselSchema);
export default carouselModel; 