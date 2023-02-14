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
      req.flash('success', `Course creation was successful ! !`);
      res.status(201).redirect('/users/dashboard');
    });
  } catch (err) {
    req.flash('error', `Course creation was fail ! !`);
    res.status(400).redirect('/users/dashboard');
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndRemove({ slug: req.params.slug });
    req.flash('success', `'${course.name}' has been removed succesfully !`);
    res.status(200).redirect('/users/dashboard');
  } catch (error) {}
};

const getAllCourses = async (req, res) => {
  try {
    const categorySlug = await req.query.categories;
    const searchQuery = await req.query.search;
    const categories = await Category.find({}).sort({ name: 1 });

    let category;

    let filter = {};

    if (categorySlug) {
      category = await Category.findOne({ slug: categorySlug });
      filter = { category: category._id };
    }

    if (searchQuery) {
      filter = { name: searchQuery };
      console.log('Filter', filter);
    }

    if (!categorySlug && !searchQuery) {
      (filter.name = ''), (filter.category = null);
    }

    const courses = await Course.find({
      $or: [
        { name: { $regex: '.*' + filter.name + '.*', $options: 'i' } },
        { category: filter.category },
      ],
    })
      .populate(['category', 'createdBy'])
      .sort({ createdAt: -1 });

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
    const user = await User.findById(req.session.userID);
    const course = await Course.findOne({ slug: req.params.slug }).populate([
      'createdBy',
      'category',
    ]);
    const userCount = await (await User.find({ courses: course._id })).length;
    const categories = await Category.find({}).sort({ name: 1 });
    res.render('course', {
      status: 'success',
      page_name: 'courses',
      course,
      categories,
      user,
      userCount,
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

const releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.pull({ _id: req.body.course_id });
    await user.save();
    res.redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
export {
  createCourse,
  getAllCourses,
  getCourse,
  enrollCourse,
  releaseCourse,
  deleteCourse,
};
