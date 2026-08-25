import userModel from "../models/userModel.js"
import userActivityModel from "../models/userActivityModel.js"
import productScoreModel from "../models/productScoreModel.js"

// add products to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        if (cartData[itemId]) {
            cartData[itemId] += 1
        } else {
            cartData[itemId] = 1
        }

        await userModel.findByIdAndUpdate(userId, { cartData })

        // ✅ Track cart_add activity (+5 points)
        try {
            await new userActivityModel({ userId, productId: itemId, type: 'cart_add', points: 5 }).save();
            await productScoreModel.findOneAndUpdate(
                { productId: itemId },
                { $inc: { totalPoints: 5, cartCount: 1 }, $set: { lastUpdated: Date.now() } },
                { upsert: true }
            );
        } catch (_) {}

        res.json({ success: true, message: "Added To Cart" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// update user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, quantity } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId] = quantity

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: "Cart Updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// get user cart data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        res.json({ success: true, cartData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { addToCart, updateCart, getUserCart }
