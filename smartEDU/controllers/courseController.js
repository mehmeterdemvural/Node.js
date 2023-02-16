import slugify from 'slugify';

import { Course } from '../models/Course.js';
import { Category } from '../models/Category.js';
import { User } from '../models/User.js';

const createCourse = async (req, res) => {
  try {
    let uploadedImage = req.files.image;
    let uploadPath = './public/uploads/' + uploadedImage.name;
    await uploadedImage.mv(uploadPath, async () => {
      await Course.create({
        name: req.body.name,
        description: req.body.description,
        image: '/uploads/' + uploadedImage.name,
        category: req.body.category,
        createdBy: req.body.ID || req.session.userID,
      });
      const course = await Course.findOne({ name: req.body.name });
      await Category.updateOne(
        { _id: req.body.category },
        {
          $push: { courses: course._id },
        }
      );
      await User.updateOne(
        { _id: course.createdBy },
        {
          $push: { courses: course._id },
        }
      );
      req.flash('success', `Course creation was successful ! !`);
      res.status(201).redirect('/users/dashboard');
    });
  } catch (err) {
    req.flash('error', `Course creation was failed ! !`);
    res.status(400).redirect('/users/dashboard');
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    await User.updateMany(
      { courses: course._id },
      {
        $pull: { courses: course._id },
      }
    );
    await Course.findOneAndRemove({ slug: req.params.slug });

    req.flash('success', `'${course.name}' has been removed succesfully !`);
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    req.flash('error', `Course delete was failed ! !`);
    res.status(400).redirect('/users/dashboard');
  }
};

const updateCourse = async (req, res) => {
  try {
    let uploadedImage = await req.files.image;
    let uploadPath = (await './public/uploads/') + uploadedImage.name;
    const courseOne = await Course.findOne({ slug: req.params.slug });
    await User.updateOne(
      { _id: courseOne.createdBy },
      {
        $pull: { courses: courseOne._id },
      }
    );
    await Category.updateOne(
      { _id: courseOne.category },
      {
        $pull: { courses: courseOne._id },
      }
    );
    uploadedImage.mv(uploadPath, async () => {
      await Course.updateOne(
        { slug: req.params.slug },
        {
          name: req.body.name,
          description: req.body.description,
          image: '/uploads/' + uploadedImage.name,
          category: req.body.category,
          createdBy: req.body.ID || req.session.userID,
          slug: slugify(req.body.name, {
            lower: true,
            strict: true,
          }),
        }
      );
      const updateCourse = await Course.findOne({ _id: courseOne._id });

      await User.updateOne(
        { _id: updateCourse.createdBy },
        {
          $push: { courses: updateCourse._id },
        }
      );
      await Category.updateOne(
        { _id: updateCourse._id },
        {
          $push: { courses: updateCourse._id },
        }
      );

      req.flash('success', `'${req.body.name}' has been updated succesfully !`);
      res.status(200).redirect('/users/dashboard');
    });
  } catch (error) {
    req.flash('error', `Course update was failed ! !`);
    res.status(400).redirect('/users/dashboard');
  }
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
    const teachers = await User.find({ role: 'teacher' });
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
      teachers,
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
    await User.updateOne(
      { _id: req.session.userID },
      {
        $push: { courses: req.body.course_id },
      }
    );
    await Course.updateOne(
      { _id: req.body.course_id },
      {
        $push: { students: req.session.userID },
      }
    );
    req.flash('success', 'Enrolled !');
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
    await User.updateOne(
      { _id: req.session.userID },
      {
        $pull: { courses: req.body.course_id },
      }
    );
    await Course.updateOne(
      { _id: req.body.course_id },
      {
        $pull: { students: req.session.userID },
      }
    );

    // const user = await User.findById(req.session.userID);
    // await user.courses.pull({ _id: req.body.course_id });
    // await user.save();
    req.flash('success', 'Enrolled Cancelled !');
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
  updateCourse,
};
