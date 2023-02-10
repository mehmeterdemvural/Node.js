import express from 'express';
import {
  createCourse,
  getAllCourses,
  getCourse,
} from '../controllers/courseController.js';

const router = express.Router();

router.route('/').get(getAllCourses);
router.route('/').post(createCourse);
router.route('/course/:slug').get(getCourse);

export default router;
