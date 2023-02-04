import express from 'express';
const app = express();


app.get("/", (req, res)=> {
    res.send("Merhaba");
})

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu port ${port} de çalışmaya başladı ! !`);
});
 