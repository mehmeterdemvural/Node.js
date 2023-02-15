import { User } from '../models/User.js';

const roleMiddleware = (roles) => {
  return async (req, res, next) => {
    console.log(req.session.userID);
    const user = await User.findById(req.session.userID);
    console.log(user.role);
    if (roles.includes(user.role)) {
      next();
    } else {
      return res.status(401).send('You cant do it');
    }
  };
};

export default roleMiddleware;
