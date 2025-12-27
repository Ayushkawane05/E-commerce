import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        let token = req.headers.token || req.headers.authorization
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again" })
        }

        if (typeof token === 'string' && token.startsWith('Bearer ')) {
            token = token.split(' ')[1]
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded || decoded.email !== process.env.ADMIN_EMAIL || decoded.role !== 'admin') {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again" })
        }

        req.admin = { email: decoded.email }
        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({ success: false, message: error.message })
    }
}

export default adminAuth