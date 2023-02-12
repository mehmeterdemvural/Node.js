const redirectMiddleware = (req, res, next) => {
  if (req.session.userID) {
    return res.redirect('/users/dashboard');
  }
  next();
};

export default redirectMiddleware;
