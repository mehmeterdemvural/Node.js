// 3. Parti Import
import express from 'express';
import mongoose from 'mongoose';
import fileupload from 'express-fileupload';
import methodOverride from 'method-override';
import ejs from 'ejs';
import fs from 'fs';

// Yerel Import
import {
  addPhoto,
  deletePhoto,
  getAllPhotos,
  getPhoto,
  updatePhoto,
} from './controllers/photoController.js';
import {
  getAboutPage,
  getAddPage,
  getEditPage,
} from './controllers/pageController.js';
import { get } from 'http';

// Midilware
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
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

const uploadDir = './public/uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Routers
app.get('/', getAllPhotos);
app.get('/photo/:id', getPhoto);
app.post('/photos', addPhoto);
app.put('/photos/:id', updatePhoto);
app.delete('/photos/:id', deletePhoto);
app.get('/about', getAboutPage);
app.get('/add', getAddPage);
app.get('/photos/edit/:id', getEditPage);

//Port
const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu port ${port} de çalışmaya başladı ! !`);
});
