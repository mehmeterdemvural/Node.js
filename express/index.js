const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("Bir istek alındı, URL : ", req.url);
  res.status(200).send("Express Module Home Page");
});

app.get("/about", (req, res) => {
    console.log("Bir istek alındı, URL : ", req.url);
    res.status(200).send("Express Module About Page");
  });

  app.get("/contact", (req, res) => {
    console.log("Bir istek alındı, URL : ", req.url);
    res.status(200).send("Express Module Contact Page");
  });

  app.get("*", (req, res) => {
    console.log("Bir istek alındı, URL : ", req.url);
    res.status(404).send("Express Module 404 Not Found");
  });

const port = 3000;
app.listen(port, ()=>{
    console.log(`Sunucu port ${port} de çalışmaya başladı ! !`);
});
