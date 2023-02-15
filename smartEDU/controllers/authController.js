import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import { User } from '../models/User.js';
import { Category } from '../models/Category.js';
import { Course } from '../models/Course.js';

const createUser = async (req, res) => {
  const errors = validationResult(req);
  try {
    if (!errors.array().length > 0) {
      await bcrypt.hash(req.body.password, 10, async function (err, hash) {
        let user = await req.body;

        user.password = hash;

        await User.create(user);
      });
      res.status(201).redirect('/login');
    } else {
      reject();
    }
  } catch (error) {
    for (let i = 0; i < errors.array().length; i++) {
      req.flash('error', `${errors.array()[i].msg}`);
    }
    res.status(400).redirect('/register');
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await User.updateOne(
      { _id: req.params.id },
      {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        courses: req.body.courses,
      }
    );
    req.flash('success', `'${req.body.name}' has been updated succesfully !`);
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    req.flash('error', `Student update was failed ! !`);
    res.status(400).redirect('/users/dashboard');
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await User.findOneAndRemove({ _id: req.params.id });
    req.flash('success', `'${student.name}' has been removed succesfully !`);
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    req.flash('error', `Student delete was failed ! !`);
    res.status(400).redirect('/users/dashboard');
  }
};

const updateTeacher = async (req, res) => {
  try {
    const teacher = await User.updateOne(
      { _id: req.params.id },
      {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
      }
    );
    req.flash('success', `'${req.body.name}' has been updated succesfully !`);
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    req.flash('error', `Student update was failed ! !`);
    res.status(400).redirect('/users/dashboard');
  }
};

const deleteTeacher = async (req, res) => {
  try {
    // const teacher = await User.findOneAndRemove({ _id: req.params.id });
    // const courses = await Course.deleteMany({ createdBy: req.params.id });
    const course = await Course.find({ createdBy: req.params.id });
    const coursesID = await course.map((course) => course._id);
    const students = await User.find({ role: 'student' });
    const result = students.map((student) => {
      for (let i = 0; i < student.courses.length; i++) {
        if (coursesID.includes(student.courses[i])) {
          return student._id;
        }
      }
    });
    console.log(result);

    req.flash('success', `Teacher has been removed succesfully !`);
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    req.flash('error', `Teacher delete was failed ! !`);
    res.status(400).redirect('/users/dashboard');
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = await req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          req.session.userID = user._id;
          res.status(201).redirect('/users/dashboard');
        } else if (password) {
          req.flash('error', `Your password is not correct !`);
          res.status(400).redirect('/login');
        } else {
          req.flash('error', `Please enter a password !`);
          res.status(400).redirect('/login');
        }
      });
    } else if (email) {
      req.flash('error', `Email is not found !`);
      res.status(400).redirect('/login');
    } else {
      req.flash('error', `Please enter a email !`);
      res.status(400).redirect('/login');
    }
  } catch (error) {
    res.status(400).redirect('/');
  }
};

const logoutUser = async (req, res) => {
  try {
    req.session.destroy(() => {
      res.status(200).redirect('/');
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

const getDashboardPage = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID).populate('courses');
    const categories = await Category.find({}).sort({ name: 1 });
    const courses = await Course.find({ createdBy: user }).sort({
      createdAt: -1,
    });
    const allCourses = await Course.find({}).sort({ name: 1 });
    const students = await User.find({ role: 'student' })
      .sort('name')
      .populate('courses');
    const teachers = await User.find({ role: 'teacher' }).sort('name');

    res.status(200).render('dashboard', {
      page_name: 'dashboard',
      user,
      categories,
      courses,
      students,
      teachers,
      allCourses,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
export {
  createUser,
  loginUser,
  logoutUser,
  getDashboardPage,
  updateStudent,
  deleteStudent,
  updateTeacher,
  deleteTeacher,
};
