import express from 'express';
import mongoose from 'mongoose';
import ejs from 'ejs';

import { Photo } from './models/Photo.js';

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
  const photos = await Photo.find({});
  res.render('index', {
    photos,
  });
});
app.get('/photos/:id', async (req, res) => {
  // console.log(req.params.id);
  // res.render('about');
  const photo = await Photo.findById(req.params.id);
  res.render("photos", {
    photo, 
  })
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});
app.post('/photos', async (req, res) => {
  await Photo.create(req.body, (err, photo) => {
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
