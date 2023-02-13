import express from 'express';
import {
  createCourse,
  enrollCourse,
  getAllCourses,
  getCourse,
} from '../controllers/courseController.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.route('/').get(getAllCourses);
router.route('/').post(roleMiddleware(['teacher', 'admin']), createCourse);
router.route('/course/:slug').get(getCourse);
router.route('/enroll').post(enrollCourse);

export default router;
