import mongoose from "mongoose";

const productScoreSchema = new mongoose.Schema({
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'product', 
        required: true, 
        unique: true 
    },
    totalPoints: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    viewTime: { type: Number, default: 0 },    // total seconds spent viewing
    searchCount: { type: Number, default: 0 },
    cartCount: { type: Number, default: 0 },
    orderCount: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
});

const productScoreModel = mongoose.models.productScore || mongoose.model('productScore', productScoreSchema);
export default productScoreModel;
