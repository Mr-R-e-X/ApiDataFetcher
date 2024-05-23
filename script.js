let fecthBtn = document.querySelector("#fetchButton");
let container = document.querySelector("#dataContainer");

function PromiseApi1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/posts")
        .then((response) => response.json())
        .then((data) => {
          displayDataApi1(data, "Posts");
          resolve(true);
        })
        .catch((error) => reject(error));
    }, 1000);
  });
}

function PromiseApi2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/products")
        .then((response) => response.json())
        .then((data) => {
          displayDataApi2(data, "Products");
          resolve(true);
        })
        .catch((error) => reject(error));
    }, 2000);
  });
}

function PromiseApi3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/todos")
        .then((response) => response.json())
        .then((data) => {
          displayDataApi3(data, "Todos");
          resolve(true);
        })
        .catch((error) => reject(error));
    }, 3000);
  });
}

function startPromiseChain() {
  PromiseApi1()
    .then((result) => {
      if (result) return PromiseApi2();
    })
    .then((result) => {
      if (result) return PromiseApi3();
    })
    .catch((error) => console.log("Error fetching data: ", error));
}

function displayDataApi1(data, title) {
  let container = document.querySelector("#post");
  container.innerHTML = "";
  container.innerHTML += `<h2>${title}</h2>`;
  let table = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Body</th>
                    <th>User ID</th>
                    <th>Tags</th>
                    <th>Reactions</th>
                </tr>
            </thead>
            <tbody>
                ${data.posts
                  .map(
                    (post) => `
                    <tr>
                        <td>${post.id}</td>
                        <td>${post.title}</td>
                        <td>${post.body}</td>
                        <td>${post.userId}</td>
                        <td>${post.tags
                          .map(
                            (tag, idx) =>
                              `<span class="tag">${idx + 1}. ${tag}</span>`
                          )
                          .join("")}</td>
                        <td>${post.reactions}</td>
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
    `;
  container.innerHTML += table;
}

function displayDataApi2(data, title) {
  let container = document.querySelector("#product");
  container.innerHTML = "";
  container.innerHTML += `<h2>${title}</h2>`;
  let table = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Discount Percentage</th>
                    <th>Rating</th>
                    <th>Stock</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Thumbnail</th>
                </tr>
            </thead>
            <tbody>
                ${data.products
                  .map(
                    (post) => `
                    <tr>
                        <td>${post.id}</td>
                        <td>${post.title}</td>
                        <td>${post.description}</td>
                        <td>$${post.price}</td>
                        <td>${post.discountPercentage}%</td>
                        <td>${post.rating}</td>
                        <td>${post.stock}</td>
                        <td>${post.brand}</td>
                        <td>${post.category}</td>
                        <td><img src="${post.thumbnail}" height="100px" width="auto" title="Thumbnail" /></td>
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
    `;
  container.innerHTML += table;
}

function displayDataApi3(data, title) {
  let container = document.querySelector("#todo");
  container.innerHTML = "";
  container.innerHTML += `<h2>${title}</h2>`;
  let table = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>TODO</th>
                    <th>Completed</th>
                    <th>User ID</th>
                </tr>
            </thead>
            <tbody>
                ${data.todos
                  .map(
                    (post) => `
                    <tr>
                        <td>${post.id}</td>
                        <td>${post.todo}</td>
                        <td>${post.completed}</td>
                        <td>${post.userId}</td>
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
    `;
  container.innerHTML += table;
}

fecthBtn.addEventListener("click", startPromiseChain);
