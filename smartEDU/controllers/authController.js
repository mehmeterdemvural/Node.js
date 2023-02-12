import { User } from '../models/User.js';
import bcrypt from 'bcrypt';

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      user,
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
          res.status(201).json({
            status: 'success',
            user,
          });
        } else {
          res.send('Wrong Password')
        }
      });
    } else {
      res.send('Email is not found')

    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
export { createUser, loginUser };
