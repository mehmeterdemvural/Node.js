import express from "express";

const app = express();

app.get("/", (req, res)=>{
    res.status(200).send('index sayfası')
})

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu port ${port} de çalışmaya başladı ! !`);
});
