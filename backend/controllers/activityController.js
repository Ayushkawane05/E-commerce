import userActivityModel from "../models/userActivityModel.js";
import productScoreModel from "../models/productScoreModel.js";
import productModel from "../models/productModel.js";

// =============================================
// Points table
// =============================================
const POINTS = {
    view: (durationSeconds) => Math.floor(durationSeconds / 10), // +1 pt per 10s
    search: 2,
    cart_add: 5,
    order: 10
};

// =============================================
// Track user activity and update product score
// =============================================
const trackActivity = async (req, res) => {
    try {
        const { productId, type, durationSeconds = 0, searchQuery = '', userId = null } = req.body;

        if (!productId || !type) {
            return res.json({ success: false, message: 'productId and type are required' });
        }

        // Validate product exists
        const product = await productModel.findById(productId);
        if (!product) {
            return res.json({ success: false, message: 'Product not found' });
        }

        // Calculate points
        let points = 0;
        if (type === 'view') {
            points = POINTS.view(Number(durationSeconds));
        } else if (POINTS[type] !== undefined) {
            points = POINTS[type];
        }

        // Log the activity event
        const activity = new userActivityModel({
            userId: userId || null,
            productId,
            type,
            durationSeconds: Number(durationSeconds),
            searchQuery,
            points
        });
        await activity.save();

        // Update (or create) the aggregated product score
        const update = {
            $inc: { totalPoints: points, lastUpdated: Date.now() },
            $set: { lastUpdated: Date.now() }
        };

        if (type === 'view') {
            update.$inc.viewCount = 1;
            update.$inc.viewTime = Number(durationSeconds);
        } else if (type === 'search') {
            update.$inc.searchCount = 1;
        } else if (type === 'cart_add') {
            update.$inc.cartCount = 1;
        } else if (type === 'order') {
            update.$inc.orderCount = 1;
        }

        await productScoreModel.findOneAndUpdate(
            { productId },
            update,
            { upsert: true, new: true }
        );

        res.json({ success: true, message: 'Activity tracked', points });

    } catch (error) {
        console.error('trackActivity error:', error);
        res.json({ success: false, message: error.message });
    }
};

// =============================================
// Get top recommended products (by totalPoints)
// =============================================
const getRecommendations = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 8;

        // Get top scored product IDs
        const topScores = await productScoreModel
            .find({})
            .sort({ totalPoints: -1 })
            .limit(limit)
            .lean();

        if (topScores.length === 0) {
            // Fallback: return latest products if no scores yet
            const fallback = await productModel.find({}).sort({ date: -1 }).limit(limit);
            return res.json({ success: true, products: fallback, isFallback: true });
        }

        // Fetch full product data
        const productIds = topScores.map(s => s.productId);
        const products = await productModel.find({ _id: { $in: productIds } }).lean();

        // Merge score data into products and sort by points
        const productsWithScore = products.map(p => {
            const score = topScores.find(s => s.productId.toString() === p._id.toString());
            return { ...p, recommendationScore: score?.totalPoints || 0 };
        }).sort((a, b) => b.recommendationScore - a.recommendationScore);

        res.json({ success: true, products: productsWithScore });

    } catch (error) {
        console.error('getRecommendations error:', error);
        res.json({ success: false, message: error.message });
    }
};

// =============================================
// Reset product scores after order placement
// =============================================
const resetProductScores = async (productIds) => {
    try {
        await productScoreModel.updateMany(
            { productId: { $in: productIds } },
            { $set: { totalPoints: 0, viewCount: 0, viewTime: 0, searchCount: 0, cartCount: 0, orderCount: 0, lastUpdated: Date.now() } }
        );
    } catch (error) {
        console.error('resetProductScores error:', error);
    }
};

// =============================================
// Admin: Get activity analytics
// =============================================
const getAnalytics = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 20;
        const scores = await productScoreModel
            .find({})
            .sort({ totalPoints: -1 })
            .limit(limit)
            .populate('productId', 'name image category price')
            .lean();

        res.json({ success: true, analytics: scores });
    } catch (error) {
        console.error('getAnalytics error:', error);
        res.json({ success: false, message: error.message });
    }
};

export { trackActivity, getRecommendations, resetProductScores, getAnalytics };
