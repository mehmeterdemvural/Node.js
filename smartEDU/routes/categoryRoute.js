import express from 'express';
import { createCategory } from '../controllers/categoryController.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.route('/').post(roleMiddleware(['admin']), createCategory);

export default router;
