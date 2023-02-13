import bcrypt from 'bcrypt';

import { User } from '../models/User.js';
import { Category } from '../models/Category.js';
import { Course } from '../models/Course.js';

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).render('login', {
      page_name: 'login',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
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
          res.status(201).redirect('dashboard');
        } else {
          res.send('Wrong Password');
        }
      });
    } else {
      res.send('Email is not found');
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
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
    console.log(courses);
    res.status(200).render('dashboard', {
      page_name: 'dashboard',
      user,
      categories,
      courses,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
export { createUser, loginUser, logoutUser, getDashboardPage };
