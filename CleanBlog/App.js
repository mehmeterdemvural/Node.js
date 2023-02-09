import express from 'express';
import mongoose from 'mongoose';
import ejs from 'ejs';
import methodOverride from 'method-override';

import { Post } from './models/Post.js';
import {
  addPost,
  getAllPosts,
  getPost,
  editPost,
  deletePost,
} from './controllers/postControllers.js';
import {
  getAboutPage,
  getAddPostPage,
  getEditPage,
  getNotFoundPage,
} from './controllers/pageController.js';

const app = express();
mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db', (err, res) => {
  if (err) {
    console.log(err);
  }
  console.log('DB Bağlantı Başarılı');
});

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.get('/', getAllPosts);
app.get('/post/:id', getPost);
app.post('/post', addPost);
app.put('/post/:id', editPost);
app.delete('/post/:id', deletePost);
app.get('/about', getAboutPage);
app.get('/add_post', getAddPostPage);
app.get('/edit/post/:id', getEditPage);
app.get('*', getNotFoundPage);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu port ${port} de çalışmaya başladı ! !`);
});
