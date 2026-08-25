import express from 'express';
import { trackActivity, getRecommendations, getAnalytics } from '../controllers/activityController.js';
import adminAuth from '../middleware/adminAuth.js';

const activityRouter = express.Router();

// Public: track a user activity event
activityRouter.post('/track', trackActivity);

// Public: get recommended products
activityRouter.get('/recommendations', getRecommendations);

// Admin: get full analytics
activityRouter.get('/analytics', adminAuth, getAnalytics);

export default activityRouter;
