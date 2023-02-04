import * as fs from "node:fs";

// // Dosya Okumak

fs.readFile("./paswsword.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  console.log("Dosya okundu : ", data);
});


// // Dosya Yazmak

fs.writeFile("example.txt", "Merhaba yeni dosya", "utf-8", (err) => {
  if (err) console.log(err);
  console.log("TXT dosyası oluşturuldu");
});

fs.writeFile ("example.json", '{"firtsName": "Erdem", "lastName" : "Vural"}', "utf8", (err) =>{
    if (err) console.log(err);
    console.log("JSON dosyası oluşturuldu");
})

// Dosyaya Yeni Veri Eklemek

fs.appendFile ("./example.txt", "\nyeni veri eklendi", 'utf-8', (err)=>{
    if (err)console.log(err);
    console.log('veri ekleme başarılı');
})

// Dosya Silmek

fs.unlink("example.json", (err) => {
    if (err) {
        console.log(err);
    };
    console.log("Dosya Silme İşlemi Başarılı");
});

// Klasör Ekleme

fs.mkdir("eklenenKlasor", (err) => {
    if (err) {
        console.log(err);
    };
    console.log("Klasör Ekleme İşlemi Başrılı");
});

fs.mkdir("iciceKlsor/icKlasor", {recursive: true}, (err)=> {
    if (err) {
        console.log(err)
    };
    console.log("İçiçe Klasör Ekleme İşlemi Başarılı")
});

// Klasör Silme

fs.rmdir("eklenenKlasor", (err) => {
    if (err) {
        console.log(err);
    };
    console.log("Klasör Silme İşlemi Başarılı");
});