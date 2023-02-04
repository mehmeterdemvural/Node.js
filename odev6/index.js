import Koa from "koa";
const app = new Koa();

// response
app.use((ctx) => {
  const url = ctx.url;
  console.log(`Bir istek gerçekleştirildi. URL : ${url}`);
  if (url === "/" || url === "/index") {
    ctx.body = "<h1>Welcome to index page</h1>";
  } else if (url === "/hakkimda") {
    ctx.body = "<h1>Welcome to hakkimda page</h1>";
  } else if (url === "/iletisim") {
    ctx.body = "<h1>Welcome to iletisim page</h1>";
  } else {
    ctx.body = "<h1>404 Not Found  !</h1>";
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu port ${port} de başlatıldı !!!`);
});
