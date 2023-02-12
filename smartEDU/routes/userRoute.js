import express from 'express';
import { createUser } from '../controllers/authController.js';

const router = express.Router();

router.route('/signup').post(createUser);

export default router;
