import express from 'express';
import { getMarquee, updateMarquee, toggleMarquee, getAllMarquees } from '../controllers/marqueeController.js';
import adminAuth from '../middleware/adminAuth.js';
import upload from '../middleware/multer.js';

const marqueeRouter = express.Router();

// Public: get active marquee
marqueeRouter.get('/get', getMarquee);

// Admin: update marquee text/image
marqueeRouter.post('/update', adminAuth, upload.single('image'), updateMarquee);

// Admin: toggle marquee on/off
marqueeRouter.post('/toggle', adminAuth, toggleMarquee);

// Admin: list all marquees
marqueeRouter.get('/all', adminAuth, getAllMarquees);

export default marqueeRouter;
