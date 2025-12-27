import express from 'express';
import { addSlide, getSlides, removeSlide } from '../controllers/carouselController.js';
import adminAuth from '../middleware/adminAuth.js';
import upload from '../middleware/multer.js';

const carouselRouter = express.Router();

carouselRouter.post('/add', adminAuth, upload.single('image'), addSlide);
carouselRouter.get('/list', getSlides);
carouselRouter.post('/remove', adminAuth, removeSlide);

export default carouselRouter;