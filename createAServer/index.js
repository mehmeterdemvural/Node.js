import http from "http";

// Server Oluşturuldu
const server = http.createServer((req, res) => {
  console.log("Bir istek gönderildi");
  // response döndürüldü
  // res.write("Merhaba");

  const url = req.url;

  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>index sayfasi</h1>");
  } else if (url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("about sayfasi");
  } else if (url === "/contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("contact sayfasi");
  } else {
    res.writeHead(400, { "Content-Type": "text/html" });
    res.write("404 not found");
  }
  // respose sonlandırıldı
  res.end();
});

// Port İleride Kullanılmak Üzere Sabit Bir Değişkene Atandı
const port = 3000;

//Server Daha Önce Sabite Atanan İlgili Port Dinlenişlmeye Başlanıldı
server.listen(port, () => {
  console.log(`Sunucu port ${port} de başlatıldı`);
});
