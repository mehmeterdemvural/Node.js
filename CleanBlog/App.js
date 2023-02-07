import express from 'express';
import mongoose from 'mongoose';
import ejs from 'ejs';

import { Post } from './models/Post.js';

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

app.get('/', async (req, res) => {
  const posts = await Post.find({});
  console.log(posts[0]);
  res.render('index', {
    posts,
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/post', (req, res) => {
  res.render('post');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/post', async (req, res) => {
  await Post.create(req.body, (err, post) => {
    console.log(req.body);
    if (err) {
      console.log(err);
    }
  });
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu port ${port} de çalışmaya başladı ! !`);
});
