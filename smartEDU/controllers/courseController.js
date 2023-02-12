import { Course } from '../models/Course.js';
import { Category } from '../models/Category.js';
import { User } from '../models/User.js';

const createCourse = async (req, res) => {
  try {
    let uploadedImage = req.files.image;
    let uploadPath = './public/uploads/' + uploadedImage.name;
    uploadedImage.mv(uploadPath, async () => {
      const course = await Course.create({
        ...req.body,
        image: '/uploads/' + uploadedImage.name,
      });
      res.status(200).redirect(`/courses/course/${course.slug}`)
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: 'Kurs oluşturma başarısız',
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const categorySlug = await req.query.categories;

    let category;

    let filter = {};

    if (categorySlug) {
      category = await Category.findOne({ slug: categorySlug });
      filter = { category: category._id };
    }

    const courses = await Course.find(filter).sort({ createdAt: -1 });

    const categories = await Category.find({}).sort({ name: 1 });

    res.status(200).render('courses', {
      status: 'success',
      page_name: 'courses',
      courses,
      categories,
      categorySlug,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    res.render('course', {
      status: 'success',
      page_name: 'courses',
      course,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
export { createCourse, getAllCourses, getCourse };
