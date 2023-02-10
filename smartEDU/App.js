import express from 'express';
import ejs from 'ejs';
import mongoose from 'mongoose';

import pageRoute from './routes/pageRoute.js';
import courseRoute from './routes/courseRoute.js';

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
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu port ${port} de çalışmaya başladı ! !`);
});
