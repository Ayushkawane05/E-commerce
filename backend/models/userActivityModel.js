import mongoose from "mongoose";

const userActivitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', default: null },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    type: { 
        type: String, 
        enum: ['view', 'search', 'cart_add', 'order'], 
        required: true 
    },
    durationSeconds: { type: Number, default: 0 }, // for 'view' type only
    searchQuery: { type: String, default: '' },     // for 'search' type
    points: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
});

const userActivityModel = mongoose.models.userActivity || mongoose.model('userActivity', userActivitySchema);
export default userActivityModel;
