let books = [
  { name: "book1", author: "author1" },
  { name: "book2", author: "author2" },
];

const bookList = () => {
  books.map((book) => console.log(book.name));
};

const addBook = (newBook) => {
  const promise1 = new Promise((resolve, reject) => {
    books.push(newBook);
    resolve("Ekleme İşlemi Gerçekleştirildi");
    // reject("Ekleme İşlemi Gerçekleştirilemedi.")
  });
  return promise1;
};

addBook({ name: "book3", author: "author3" })
  .then((message) => {
    console.log(message);
    bookList();
  })
  .catch((err) => {
    console.log(err);
  });
