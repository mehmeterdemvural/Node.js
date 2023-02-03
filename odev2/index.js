let posts = [
  "Bugün hava çok güzel",
  "Seçimi kim kazanır?",
  "Sınavlar bitse de kurtulsak!",
  "Nerede o eski günler!",
];
function showPosts() {
  posts.map((post) => console.log(post));
}
showPosts();

const addPost = (newPost) => {
  const promise = new Promise((resolve, reject) => {
    if (newPost == "") {
      reject("Boş post gönderilemez");
    } else {
      resolve(posts.push(newPost));
    }
  });
  return promise;
};

async function asyncAddPost(newPost) {
  try {
    await addPost(newPost);
    showPosts();
  } catch (e) {
    console.log(e);
  }
}
