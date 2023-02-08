import express from 'express';
import mongoose from 'mongoose';
import fileupload from 'express-fileupload';
import methodOverride from 'method-override';
import ejs from 'ejs';
import fs from 'fs';

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
app.use(fileupload());
app.use(methodOverride('_method'));

const uploadDir = './public/uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort({ dateCreated: -1 });
  res.render('index', {
    photos,
  });
});
app.get('/photo/:id', async (req, res) => {
  // console.log(req.params.id);
  // res.render('about');
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});
app.post('/photos', async (req, res) => {
  // console.log(req.files)
  let uploadedImage = req.files.image;
  let uploadPath = './public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create(
      {
        ...req.body,
        image: '/uploads/' + uploadedImage.name,
      },
      (err, photo) => {
        if (err) {
          console.log(err);
        }
      }
    );
    res.redirect('/');
  });
});

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('edit', {
    photo,
  });
});

app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photo/${req.params.id}`);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu port ${port} de çalışmaya başladı ! !`);
});
