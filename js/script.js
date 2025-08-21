
// Online/Offline banner

const noInternet = document.querySelector('.noInternet');

function showOnline(isOnline) {
  if (!noInternet) return;
  noInternet.style.display = isOnline ? 'none' : 'block';
}

// start + listeners
window.addEventListener('online', () => showOnline(true));
window.addEventListener('offline', () => showOnline(false));
window.addEventListener('DOMContentLoaded', () => showOnline(navigator.onLine));

// -------------------------------------------------------------------------------------------------------------------

let allProducts = document.querySelector(".products")
let AddToCartBtn = document.querySelector(".AddToCartBtn")
let RemoveFromCartBtn = document.querySelector(".RemoveFromCartBtn")

const products = [
  { id: 1, title: "Dell G15-5520", category: "Laptop", color: "Black", price: 36870, salePrice: 36270, imageURL: "images/Labtop1.jpg" },
  { id: 2, title: "Lenovo V15", category: "Laptop", color: "Gray", price: 13333, salePrice: 13011, imageURL: "images/Labtop2.jpg" },
  { id: 3, title: "HP Victus", category: "Laptop", color: "Black", price: 47699, salePrice: 47438, imageURL: "images/Labtop3.jpg" },
  { id: 4, title: "Dell Vostro", category: "Laptop", color: "Black", price: 29660, salePrice: 29320, imageURL: "images/Labtop4.jpg" },
  { id: 5, title: "R50i", category: "Earbuds", color: "Black", price: 1699, salePrice: 1399, imageURL: "images/Earbuds1.jpg" },
  { id: 6, title: "R100", category: "Earbuds", color: "White", price: 1600, salePrice: 1499, imageURL: "images/Earbuds.jpg" },
  { id: 7, title: "Life P2", category: "Earbuds", color: "Black", price: 2899, salePrice: 2699, imageURL: "images/Earbuds3.jpg" },
  { id: 8, title: "Life Note E", category: "Earbuds", color: "Black", price: 2485, salePrice: 1600, imageURL: "images/Earbuds4.jpg" },
  { id: 9, title: "Generic", category: "Over Ear", color: "Blue", price: 215, salePrice: 185, imageURL: "images/Over Ear1.jpg" },
  { id: 10, title: "Panduo", category: "smart watch", color: "Green", price: 450, salePrice: 375, imageURL: "images/smartwatch1.jpg" },
  { id: 11, title: "Muktrics", category: "smart watch", color: "Black", price: 400, salePrice: 350, imageURL: "images/smartwatch2.jpg" },
  { id: 12, title: "BigPlayer", category: "smart watch", color: "Brown", price: 730, salePrice: 650, imageURL: "images/smartwatch3.jpg" },
  { id: 13, title: "Samsung Galaxy A34", category: "phone", color: "Awesome Silver", price: 11286, salePrice: 10400, imageURL: "images/phone1.jpg" },
  { id: 14, title: "A24", category: "phone", color: "Black", price: 49900, salePrice: 38090, imageURL: "images/phone2.jpg" },
  { id: 15, title: "Oppo Reno 8T", category: "phone", color: "Gray", price: 12793, salePrice: 12445, imageURL: "images/phone3.jpg" },
  { id: 16, title: "Galaxy S22", category: "phone", color: "Green", price: 24299, salePrice: 24899, imageURL: "images/phone4.jpg" },
  { id: 17, title: "Galaxy S22 Ultra", category: "phone", color: "Phantom Black", price: 32800, salePrice: 33400, imageURL: "images/phone5.jpg" },
  { id: 18, title: "Galaxy S21", category: "phone", color: "Light Green", price: 21990, salePrice: 19299, imageURL: "images/phone6.jpg" },
  { id: 19, title: "Galaxy Z Fold5", category: "phone", color: "Light blue", price: 73930, salePrice: 66000, imageURL: "images/phone7.jpg" },
];



// Helper function to get image height based on category
function getImageHeight(category) {
  const categoryHeights = {
    phone: "330px",
    "smart watch": "240px"
  };

  // Default height if category not found
  return categoryHeights[category] || "200px";
}

function drawData() {
  const productCards = products.map((item) => {
    const isFavorite = checkFavorite(item.id);
    const heartIconClass = isFavorite ? "fas" : "far"; // Solid heart if favorite
    const heightImage = getImageHeight(item.category); // Get dynamic height


    return `
            <div class="product-item col-4 mb-4 p-4">
                <div class="card border border-info pt-3">
                    <img class="product-item-img card-img-top m-auto" src="${item.imageURL}" alt="Card image" style="width:80%; height:${heightImage};">
                    <div class="product-itm-desc card-body pb-0 pl-4">
                        <p class="card-title">Product: ${item.title}.</p>
                        <p class="card-text">Category :${item.category}.</p>
                        <p class="color">Color: ${item.color}.</p>
                        <p class="card-price">Price: <span> <del>${item.price} EGP</del> ${item.salePrice} EGP</span></p>
                    </div>
                    <div class="product-item-action d-flex justify-content-between pr-4 pl-4">
                    <button id="add-btn-${item.id}" class="AddToCartBtn btn btn-primary mb-2" onClick="addTOCartEvent(${item.id})">Add To Cart</button>
                    <button id="remove-btn-${item.id}" class="RemoveFromCartBtn btn btn-primary mb-2" onClick="removeFromCart(${item.id})">Remove From Cart</button>
                        <i id="fav-${item.id}" class="${heartIconClass} fa-heart" onClick="addFav(${item.id})"></i>
                    </div>
                </div>
            </div>
        `;
  });

  allProducts.innerHTML = productCards.join('');
}
drawData();


// -------------------------------------------------------------------------------------------------------------

// ===================== SELECT DOM ELEMENTS =====================
let badge = document.querySelector(".badge");
let buyProudect = document.querySelector(".buyProudect");
let totalPrice = document.querySelector(".total .totalPrice");
let shoppingCartIcon = document.querySelector(".shoppingCart");
let cartsProudect = document.querySelector(".cartsProudect");

// ===================== CART VARIABLES =====================
let quantity = 1;                                                  // Default quantity for a product
let total = localStorage.getItem("totalPrice") ?                 // Retrieve total price from localStorage if exists
  +(localStorage.getItem("totalPrice")) : 0;

// Get cart items from localStorage or start with empty array
let addItemStorage = localStorage.getItem("proudectInCart") ?
  JSON.parse(localStorage.getItem("proudectInCart")) : [];

// ===================== INITIALIZE CART ON PAGE LOAD =====================
if (addItemStorage) {
  // Loop through each product in the cart
  addItemStorage.map((item) => {
    drawBuyProudect(item);                                        // Render the product in the cart UI

    // Update button visibility: hide "Add" button, show "Remove" button
    document.getElementById(`add-btn-${item.id}`).style.display = "none";
    document.getElementById(`remove-btn-${item.id}`).style.display = "inline-block";

    // Update total price based on product's salePrice and saved quantity
    total += +item.salePrice * +(localStorage.getItem(`quantity-${item.id}`));
  })

  // Display total price in the cart (note: original code divides by 2, may be a bug)
  totalPrice.innerHTML = total / 2 + " EGP";

  // Show or hide the cart badge depending on whether there are items
  if (addItemStorage.length != 0) {
    badge.style.display = "block";       // Show badge
    badge.innerHTML = addItemStorage.length;  // Set number of items
  } else {
    badge.style.display = "none";        // Hide badge if no items
  }
}



function pls(id, salePrice) {
  // Get the quantity element for the specific product by its ID
  let quantityElement = document.getElementById(`quantity-${id}`);

  // Convert the current quantity text into a number
  let quantity = +(quantityElement.innerHTML);

  // Increase the product quantity by 1
  quantity++;

  // Update the quantity displayed in the UI
  quantityElement.innerHTML = quantity;

  // Save the updated quantity to localStorage (so it persists on reload)
  localStorage.setItem(`quantity-${id}`, quantity.toString());

  // Increase the total price by the product's sale price
  total += (+salePrice);

  // Update the total price displayed in the UI
  totalPrice.innerHTML = total + " EGP";

  // Save the updated total price in localStorage
  localStorage.setItem("totalPrice", JSON.stringify(total));

  // Refresh / open the shopping cart UI to reflect changes
  openCart();
}




function mins(id, salePrice) {
  // Get the quantity element for the specific product by its ID
  let quantityElement = document.getElementById(`quantity-${id}`);

  // Convert the current quantity text into a number
  let quantity = +(quantityElement.innerHTML);

  // If quantity is greater than 1, reduce it by 1
  if (quantity > 1) {
    quantity--;

    // Update the quantity displayed in the UI
    quantityElement.innerHTML = quantity;

    // Save the updated quantity in localStorage (so it persists on reload)
    localStorage.setItem(`quantity-${id}`, quantity.toString());

    // Subtract the product's sale price from the total
    total -= (+salePrice);

    // Update the total price displayed in the UI
    totalPrice.innerHTML = total + " EGP";

    // Save the updated total price in localStorage
    localStorage.setItem("totalPrice", JSON.stringify(total));
  }
  else {
    // If quantity reaches 0 or below, remove the product from the cart
    removeFromCart(id);
  }

  // Refresh / open the cart UI to reflect the changes
  openCart();
}



function removeFromCart(id) {
  // Find the index of the product in the cart (by matching product ID)
  let itemIndex = addItemStorage.findIndex((item) => item.id === id);

  // Get the product quantity element from the DOM
  let quantityElement = document.getElementById(`quantity-${id}`);
  let quantity = +(quantityElement.innerHTML);

  // If the product exists in the cart
  if (itemIndex !== -1) {
    // Remove the product from the array of items in the cart
    addItemStorage.splice(itemIndex, 1);

    // Save the updated cart back to localStorage
    localStorage.setItem("proudectInCart", JSON.stringify(addItemStorage));

    // Reset the total price before recalculating
    total = 0;

    // Update UI buttons: show "Add" button and hide "Remove" button
    document.getElementById(`add-btn-${id}`).style.display = "inline-block";
    document.getElementById(`remove-btn-${id}`).style.display = "none";

    // Remove the product element from the cart section in the UI if it exists
    let buyProudectItem = document.getElementById(`buyProudectItem-${id}`);
    if (buyProudectItem) {
      buyProudectItem.remove();
    }

    // Re-draw remaining items in the cart and recalculate the total price
    addItemStorage.forEach((item) => {
      drawBuyProudect(item); // Re-render each product in the cart
      total += +item.salePrice * quantity;

      // Alternative (better): use the stored quantity in localStorage
      // total += +item.salePrice * +(localStorage.getItem(`quantity-${item.id}`));
    });

    // Update the total price displayed in the UI
    totalPrice.innerHTML = total + " EGP";

    // Save the new total price in localStorage
    localStorage.setItem("totalPrice", JSON.stringify(total));

    // Update the cart badge (number of items in cart)
    if (addItemStorage.length !== 0) {
      badge.style.display = "block";
      badge.innerHTML = addItemStorage.length;
    } else {
      badge.style.display = "none";
    }
  }
}



function addTOCartEvent(id) {
  // Check if the user is logged in (username exists in localStorage)
  if (localStorage.getItem("userName")) {

    // Find the product in the full products list by its ID
    let choosenItem = products.find((item) => item.id === id);

    // Check if this product already exists in the cart (by ID)
    let itemIndex = addItemStorage.findIndex((item) => item.id === id);

    // If the product is NOT already in the cart
    if (itemIndex === -1) {
      // Render the product in the "cart section" of the UI
      drawBuyProudect(choosenItem);

      // Add the product to the cart storage array
      addItemStorage = [...addItemStorage, choosenItem];

      // Save updated cart back to localStorage
      localStorage.setItem("proudectInCart", JSON.stringify(addItemStorage));

      // Get product quantity from localStorage if it exists, otherwise default to 1
      let quantity = localStorage.getItem(`quantity-${choosenItem.id}`)
        ? +(localStorage.getItem(`quantity-${choosenItem.id}`))
        : 1;

      // Update the total price with (product price * quantity)
      total += (+choosenItem.salePrice) * quantity;

      // Update the total price displayed in the UI
      totalPrice.innerHTML = total + " EGP";

      // Save updated total price to localStorage
      localStorage.setItem("totalPrice", JSON.stringify(total));

      // Update the buttons: hide "Add" button and show "Remove" button
      document.getElementById(`add-btn-${id}`).style.display = "none";
      document.getElementById(`remove-btn-${id}`).style.display = "inline-block";

      // Update the badge with the number of items in the cart
      if (addItemStorage.length != 0) {
        badge.style.display = "block";
        badge.innerHTML = addItemStorage.length;
      }
    } else {
      // If the item already exists in the cart, hide the badge (optional behavior)
      badge.style.display = "none";
    }
  } else {
    // If the user is not logged in, redirect them to the login page
    window.location = "login.html";
  }
}



function drawBuyProudect(item) {
  // Check if the product is not already drawn in the cart UI
  // (prevents duplicating the same product in the cart display)
  if (!document.getElementById(`buyProudectItem-${item.id}`)) {

    // Get the product's quantity from localStorage (if it exists), otherwise default to 1
    let quantity = +(localStorage.getItem(`quantity-${item.id}`)) || 1;

    // Append a new product row into the "buyProudect" container
    // Each row contains:
    // - The product title
    // - The current quantity
    // - A "-" button to decrease quantity (calls mins function)
    // - A "+" button to increase quantity (calls pls function)
    buyProudect.innerHTML += `
      <div id="buyProudectItem-${item.id}" class="row my-2 pr-2">
        <span class="col-6">${item.title}</span>
        <span class="col-2" id="quantity-${item.id}">${quantity}</span>
        <span class="text-danger mins col-2" onClick="mins(${item.id},${item.salePrice})">-</span>
        <span class="text-success pls col-2" onClick="pls(${item.id},${item.salePrice})">+</span>
      </div>`;
  }
}



// --------------------------------------------------------------------------
function checkFavorite(itemId) {
  // Retrieve the list of favorite items from localStorage.
  // If no favorites exist, default to an empty array.
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Check if the given itemId exists in the favorites array.
  // This will return true if the item is a favorite, false otherwise.
  let isFavorite = favorites.includes(itemId);

  // Return the result (boolean: true/false)
  return isFavorite;
}

function addFav(id) {
  // Check if the user is logged in (by verifying if "userName" exists in localStorage)
  if (localStorage.getItem("userName")) {

    // Get the heart icon element for the given product (by its id)
    var heartIcon = document.getElementById(`fav-${id}`);

    // If the heart is currently outlined ("far" = FontAwesome regular style)
    if (heartIcon.classList.contains("far")) {
      // Change it to filled heart ("fas" = FontAwesome solid style)
      heartIcon.classList.remove("far");
      heartIcon.classList.add("fas");

      // Add the product to the user's favorites list
      addToFavorites(id);

    } else {
      // If the heart is already filled ("fas"), change it back to outlined ("far")
      heartIcon.classList.remove("fas");
      heartIcon.classList.add("far");

      // Remove the product from the user's favorites list
      removeFromFavorites(id);
    }

  } else {
    // If the user is not logged in, redirect them to the login page
    window.location = "login.html";
  }
}


function addToFavorites(itemId) {
  // Get the current favorites list from localStorage
  // If it doesn't exist, initialize it as an empty array
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Debugging: log the current favorites to the console
  console.log(favorites);

  // Check if the item is not already in the favorites list
  if (!favorites.includes(itemId)) {
    // Add the item ID to the favorites array
    favorites.push(itemId);
  }

  // Save the updated favorites list back to localStorage
  localStorage.setItem('favorites', JSON.stringify(favorites));
}


function removeFromFavorites(itemId) {
  // Retrieve the current favorites list from localStorage
  // If no favorites exist, initialize it as an empty array
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Find the index of the given itemId in the favorites array
  let index = favorites.indexOf(itemId);

  // If the itemId exists in the favorites list (index is not -1)
  if (index !== -1) {
    // Remove the item from the favorites array
    favorites.splice(index, 1);
  }

  // Save the updated favorites list back into localStorage
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// -------------------------------------------------------------------

// Attach an event listener to the shopping cart icon
// When clicked, it will run the openCart function
shoppingCartIcon.addEventListener("click", openCart);

function openCart() {
  // Check if there are any products inside the cart (not empty)
  if (buyProudect.innerHTML != "") {

    // If the cart is currently visible (display = "block")
    if (cartsProudect.style.display == "block") {
      // Hide the cart
      cartsProudect.style.display = "none";
    } else {
      // Otherwise, show the cart
      cartsProudect.style.display = "block";
    }
  }
}



// --------------------------------------------------------------------------------------

// Get references to search input and search option dropdown
let search = document.getElementById('search');
let searchOption = document.getElementById('searchOption');

// Default search mode (search by title)
let modeSearch = 'title';

// Add event listener for when the search option changes (dropdown value changes)
searchOption.addEventListener('change', function () {
  // Get the selected value from the dropdown
  let selectedValue = this.value;

  // Check which option is selected and update the search mode accordingly
  if (selectedValue === "searchTittle") {
    modeSearch = 'title';  // Search by title
    console.log(searchOption.value); // Debug: log selected option
  } else if (selectedValue === "searchCategory") {
    modeSearch = 'category'; // Search by category
    console.log(searchOption.value); // Debug: log selected option
  }

  // Update search input placeholder text to reflect the selected search mode
  search.placeholder = `search by ${modeSearch}`;

  // Focus on the search input for convenience
  search.focus();

  // Clear any existing input in the search field
  search.value = '';

  // Redraw data (likely filters or reloads the products based on the new search mode)
  drawData();
});



// --------------------------------------------------------------------
function searchData(value) {
  // Filter products based on the current search mode (title or category)
  let filteredProducts = products.filter((item) => {
    if (modeSearch === 'title') {
      // Case-insensitive search by product title
      return item.title.toLowerCase().includes(value.toLowerCase());
    } else if (modeSearch === 'category') {
      // Case-insensitive search by product category
      return item.category.toLowerCase().includes(value.toLowerCase());
    }
  });

  // Map filtered products to HTML structure
  let productCards = filteredProducts.map((item) => {

    // Check if this product is already in favorites
    let isFavorite = checkFavorite(item.id);

    // Decide which heart icon to show (filled = fas, empty = far)
    let heartIconClass = isFavorite ? "fas" : "far";

    // Set image height dynamically based on category
    let heightImage;
    switch (item.category) {
      case 'phone':
        heightImage = '330px';
        break;

      case 'smart watch':
        heightImage = '240px';
        break;

      default:
        heightImage = '200px'; // Default height for other categories
        break;
    }

    // Return HTML template for each product
    return `
      <div class="product-item col-4 mb-4 p-4">
        <div class="card border border-info pt-3">
          <!-- Product image -->
          <img 
            class="product-item-img card-img-top m-auto" 
            src="${item.imageURL}" 
            alt="Card image" 
            style="width:80%; height:${heightImage};"
          >
          
          <!-- Product description -->
          <div class="product-itm-desc card-body pb-0 pl-4">
            <p class="card-title">Product: ${item.title}.</p>
            <p class="card-text">Category: ${item.category}.</p>
            <p class="color">Color: ${item.color}.</p>
            <p class="card-price">
              Price: 
              <span> 
                <del>${item.price} EGP</del> ${item.salePrice} EGP
              </span>
            </p>
          </div>
          
          <!-- Action buttons -->
          <div class="product-item-action d-flex justify-content-between pr-4 pl-4">
            <button 
              id="add-btn-${item.id}" 
              class="AddToCartBtn btn btn-primary mb-2" 
              onClick="addTOCartEvent(${item.id})"
            >
              Add To Cart
            </button>
            
            <button 
              id="remove-btn-${item.id}" 
              class="RemoveFromCartBtn btn btn-primary mb-2" 
              onClick="removeFromCart(${item.id})"
            >
              Remove From Cart
            </button>
            
            <!-- Favorite heart icon -->
            <i 
              id="fav-${item.id}" 
              class="${heartIconClass} fa-heart" 
              onClick="addFav(${item.id})"
            ></i>
          </div>
        </div>
      </div>
    `;
  });

  // Render all the filtered products into the page
  allProducts.innerHTML = productCards.join('');
}

