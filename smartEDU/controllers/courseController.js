import { Course } from '../models/Course.js';
import { Category } from '../models/Category.js';
import { User } from '../models/User.js';

const createCourse = async (req, res) => {
  try {
    let uploadedImage = req.files.image;
    let uploadPath = './public/uploads/' + uploadedImage.name;
    uploadedImage.mv(uploadPath, async () => {
      const course = await Course.create({
        name: req.body.name,
        description: req.body.description,
        image: '/uploads/' + uploadedImage.name,
        category: req.body.category,
        createdBy: req.session.userID,
      });
      res.status(200).redirect(`/courses/course/${course.slug}`);
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
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      'createdBy'
    );
    const categories = await Category.find({}).sort({ name: 1 });
    res.render('course', {
      status: 'success',
      page_name: 'courses',
      course,
      categories,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

const enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.push({ _id: req.body.course_id });
    await user.save();
    res.redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
export { createCourse, getAllCourses, getCourse, enrollCourse };
