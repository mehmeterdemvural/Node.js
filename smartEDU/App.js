import express from 'express';
import ejs from 'ejs';
import mongoose from 'mongoose';
import fileupload from 'express-fileupload';
import methodOverride from 'method-override';
import fs from 'fs';

import pageRoute from './routes/pageRoute.js';
import courseRoute from './routes/courseRoute.js';
import categoryRoute from './routes/categoryRoute.js';

const app = express();

//Connect DB
mongoose.connect('mongodb://127.0.0.1:27017/smartedu-db', (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Database Connected ! !');
  }
});

//Template State
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

// Routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu port ${port} de çalışmaya başladı ! !`);
});
