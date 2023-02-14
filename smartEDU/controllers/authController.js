import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import { User } from '../models/User.js';
import { Category } from '../models/Category.js';
import { Course } from '../models/Course.js';

const createUser = (req, res) => {
  const errors = validationResult(req);
  try {
    if (!errors) {
      bcrypt.hash(req.body.password, 10, async function (err, hash) {
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
