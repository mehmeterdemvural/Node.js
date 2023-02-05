import express from 'express';
import ejs from 'ejs';

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
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

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu port ${port} de çalışmaya başladı ! !`);
});
