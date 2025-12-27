import express from 'express';
import { loginUser, registerUser, adminLogin, getUserProfile, allUsers } from '../controllers/userController.js';
import authUser from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js'; // ✅ Import Admin Auth middleware

const userRouter = express.Router();

// Public Routes
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)

// User Protected Route
userRouter.get('/profile', authUser, getUserProfile)

// ✅ Admin Protected Route: Fetch all users
userRouter.get('/all-users', adminAuth, allUsers)

export default userRouter;