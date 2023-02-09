import { Post } from '../models/Post.js';

const getAllPosts = async (req, res) => {
  const post = await Post.find({});
  res.render('index', {
    post,
  });
};
const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post,
  });
};

const addPost = async (req, res) => {
  await Post.create(req.body, (err, post) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect('/');
};

const editPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.title = req.body.title;
  post.detail = req.body.detail;
  post.save();
  res.redirect(`/post/${req.params.id}`);
};

const deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id)
  res.redirect('/');
};

export { getAllPosts, getPost, addPost, editPost, deletePost };
