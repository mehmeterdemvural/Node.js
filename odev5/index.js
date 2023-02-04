import http from "http";

const server = http.createServer((req,res)=>{
    const url = req.url;
    console.log("Bir İstek Alındı : ", url);
    
    if (url === '/' || url === "/index") {
        res.writeHead(200, {"Content-Type":"text/html"})
        res.write('<h2>index sayfasina hosgeldiniz</h2>')
    } else if(url === '/hakkimda'){
        res.writeHead(200, {"Content-Type":"text/html"})
        res.write('<h2>hakkimda sayfasina hosgeldiniz</h2>')
    } else if(url === '/iletisim'){
        res.writeHead(200, {"Content-Type":"text/html"})
        res.write('<h2>iletisim sayfasina hosgeldiniz</h2>')
    } else {
            res.writeHead(400, {"Content-Type":"text/html"})
            res.write('<h2>Sayfa Bulunamadi</h2>')
    }
    res.end();
});

const port = 5000;
server.listen(port, ()=>{
    console.log(`Sunucu Port ${port} de Başlatıldı !!`);
})