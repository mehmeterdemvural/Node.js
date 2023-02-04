import { log } from "console";
import * as fs from "fs";

// fs.writeFile(
//   "employees.json",
//   '{"name": "Employee 1 Name", "salary": 2000}',
//   "utf-8",
//   (err) => {
//     if (err) {
//       log(err);
//     }
//     log("Dosya Ekleme İşlemi Başarılı");
//   }
// );

// fs.readFile("employees.json", "utf-8", (err, data) => {
//   if (err) {
//     log(err);
//   }
//   log("Dosya okuma işlemi başarılı : ", data);
// });

// fs.writeFile(
//   "employees.json",
//   '{"name": "Employee 1 Name", "salary": 4000}',
//   "utf8",
//   (err) => {
//     if (err) {
//       log(err);
//     }
//     log("Veri Güncelleme Başarılı");
//   }
// );

fs.unlink("employees.json", (err) => {
  if (err) {
    log(err);
  }
  log("Silme işlemi başarılı");
});
