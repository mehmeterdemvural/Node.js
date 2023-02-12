import express from 'express';
import {
  createUser,
  loginUser,
  logoutUser,
} from '../controllers/authController.js';

const router = express.Router();

router.route('/signup').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

export default router;
