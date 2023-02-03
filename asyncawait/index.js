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
    resolve ("Başarılı");
    // reject("Başarısız");
  });
  return promise1;
};

async function showBooks(newBook) {
  try {
    await addBook(newBook);
    bookList();
  } catch (err) {
    console.log(err);
  }
}

showBooks({ name: "book3", author: "author3" });
