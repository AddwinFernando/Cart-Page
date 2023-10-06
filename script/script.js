let products = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
  },
];
let cart = [];

window.addEventListener("load", () => {
  cartNumber();
  if (!localStorage.getItem("productData")) {
    localStorage.setItem("productData", JSON.stringify(products));
  }
  if (localStorage.getItem("cart").length === 0) {
    localStorage.removeItem("cart");
  }
  if (location.pathname === "/index.html") {
    loadMainPage();
  }
  if (location.pathname === "/cart.html") {
    loadcart();
  }
});

let loadMainPage = () => {
  let userPageRef = document.getElementById("homePage");
  let pageData = JSON.parse(localStorage.getItem("productData"));

  let pageBody = "";

  for (let entry of pageData) {
    pageBody += `<div class="card" style="width: 18rem">
    <img src="/images/product.jpg" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${entry.title}</h5>
      <p class="card-text">
       ${entry.description.substring(0, 50)}...
      </p>
        <div class="d-md-flex justify-content-md-end " id="addButton${
          entry.id
        }" onclick = "addToCart(${entry.id})">
            <a href="#" class="btn btn-primary">Add To Cart</a>
        </div>
        <div class = "d-md-flex justify-content-md-end visually-hidden" id="addDiv${
          entry.id
        }">
        <input
        type="button"
        value="-"
        class="btn btn-outline-dark mx-3"
        data-field="quantity"
        onclick = "remove(${entry.id})"
      />
      <p id="quantity${entry.id}"></p>
      <input
        type="button"
        value="+"
        class="btn btn-outline-dark mx-3"
        onclick = "addToCart(${entry.id})"
        data-field="quantity"
      />
        </div>
    </div>
  </div>`;
  }
  userPageRef.innerHTML = pageBody;
};

let addToCart = (id) => {
  let addButtonList = document.getElementById(`addButton${id}`).classList;
  let addDivList = document.getElementById(`addDiv${id}`).classList;
  addButtonList.add("visually-hidden");
  addDivList.remove("visually-hidden");

  let productData = JSON.parse(localStorage.getItem("productData"));
  let quantRef = document.getElementById(`quantity${id}`);
  let currProduct = productData.find((product) => id === product.id);
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  let itemCheck = cart.find((product) => product.id === parseInt(id));

  if (itemCheck) {
    cart = cart.map((item) => {
      if (item.id === itemCheck.id) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });
  } else {
    cart.push({
      id: currProduct.id,
      title: currProduct.title,
      quantity: 1,
      price: currProduct.price,
    });
  }
  let quantity = cart.find((item) => item.id === id).quantity;
  quantRef.innerText = quantity;

  localStorage.setItem("cart", JSON.stringify(cart));

  cartNumber();
};

let remove = (id) => {
  let addButtonList = document.getElementById(`addButton${id}`).classList;
  let addDivList = document.getElementById(`addDiv${id}`).classList;

  cart = JSON.parse(localStorage.getItem("cart"));
  let quantRef = document.getElementById(`quantity${id}`);
  let itemCheck = cart.find((product) => product.id === parseInt(id));
  cart = cart.map((item) => {
    if (item.id === itemCheck.id) {
      return { ...item, quantity: item.quantity - 1 };
    } else {
      return item;
    }
  });
  let quantity = cart.find((item) => item.id === id).quantity;
  quantRef.innerText = quantity;
  if (cart.find((item) => item.id === id).quantity === 0) {
    addButtonList.remove("visually-hidden");
    addDivList.add("visually-hidden");
    console.log(id);

    cart = cart.filter((item) => item.quantity !== 0);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  cartNumber();
};

let cartNumber = () => {
  let cartRef = document.getElementById("cart");
  cart = JSON.parse(localStorage.getItem("cart"));
  let count = 0;
  for (let item of cart) {
    count += item.quantity;
  }

  if (count === 0) {
    cartRef.innerText = `Cart`;
  } else {
    cartRef.innerText = `Cart-${count}`;
  }
};

let loadcart = () => {
  let tableRef = document.getElementById("cartTableBody");
  let cartData = JSON.parse(localStorage.getItem("cart"));
  let footRef = document.getElementById("tableFooter");

  let tbody = "";
  let total = 0;
  let sn = 0;
  for (let item of cartData) {
    sn += 1;
    total = total + item.quantity * item.price;
    tbody += `<tr>
      <th scope="row">${sn}</th>
      <td>${item.title}</td>
      <td><div class = "d-md-flex">
      <input
      type="button"
      value="-"
      class="btn btn-outline-light mx-3"
      data-field="quantity"
      onclick = "removeFromCart(${item.id})"
    />
    <p id="quantity${item.id}">${item.quantity}</p>
    <input
      type="button"
      value="+"
      class="btn btn-outline-light mx-3"
      onclick = "addFromCart(${item.id})"
      data-field="quantity"
    />
      </div></td>
      <td>$${item.price * item.quantity}</td>
      </tr>`;
  }

  footRef.innerHTML = `<td colspan = "3" class="text-end">Total =</td> <td>$${total}</td>`;
  tableRef.innerHTML = tbody;
};

let addFromCart = (id) => {
  let productData = JSON.parse(localStorage.getItem("productData"));
  let currProduct = productData.find((product) => id === product.id);
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  let itemCheck = cart.find((product) => product.id === parseInt(id));
  console.log(itemCheck);
  if (itemCheck) {
    cart = cart.map((item) => {
      if (item.id === itemCheck.id) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  loadcart();
  cartNumber();
};

let removeFromCart = (id) => {
  cart = JSON.parse(localStorage.getItem("cart"));
  let itemCheck = cart.find((product) => product.id === parseInt(id));
  cart = cart.map((item) => {
    if (item.id === itemCheck.id) {
      return { ...item, quantity: item.quantity - 1 };
    } else {
      return item;
    }
  });
  let cartCheck = cart.find((item) => item.id === id).quantity === 0
  if (cartCheck) {
    console.log(cart);

    cart = cart.filter((item) => item.quantity !== 0);
    console.log(cart)
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  loadcart();
  cartNumber();
};
