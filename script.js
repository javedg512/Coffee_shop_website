
const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const dessertCards = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const showHideCartSpan = document.getElementById("show-hide-cart");
let isCartShowing = false;

const products = [
  {
    id: 1,
    name: "#1 Selling",
	category: "Hot Choclate",
    price: 12.99,   
	img : "Pic/2.png"
    
  },
  {
    id: 2,
    name: "#2 Selling",
	category: "Double Espresso",
	
    price: 39.99,
	img : "Pic/1.png"
  },
  {
    id: 3,
    name: "#3 Selling",
	category: "Espresso Mochha",
    price: 29.99,
    
	img:"Pic/3.png"
  }
  
  
];

products.forEach(
  ({ name, id, price, category,img }) => {

    dessertCards.innerHTML +=
	
	`
       <div class="col-md-4 ">
                        <div class="card" style=" border:none;">
	  
	                              <div class="card-body text-center Coffee Menu">
                                     <h4 class="card-title text-center mt-3" style=" font-size: 24px; font-weight: 550;">
                                        <img src="${img}" class="img-fluid">
                                        <div class="container mt-5 ">
                                            <h4 class="h4" style="font-weight: 400; color: #64646A; font-size: 20px;">${name}</h4>
                                            <h4 class="h2 product-category" style="font-weight: 900; color:black; font-size: 36px;">${category}</h4>
                                        </div>
                                
                                            <p class="card-text text-center mt-2" style="font-weight: 400; color: #64646A; font-size: 20px;">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis nam soluta reprehenderit </p>
                                        <div class="container" style="display: flex;">
                                            <h4 class="h4 mt-2 me-4 ms-3 dessert price" style=" font-weight: 500;">$${price}</h4>
                                            <button type= "button"  class="btn btn-dark m-auto mt-2 btn add-to-cart-btn " style="border-radius: 15px; " 
                                            id="${id}" >ADD TO CART</button>
                                        </div>
                                    </div>    
							 
						 </div>
        </div>                 
						 
						 
    `;
  }
);

class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.taxRate = 8.25;
  }

  addItem(id, products,img,category) {
    const product = products.find((item) => item.id === id);
    const { name, price } = product;
    this.items.push(product);

    const totalCountPerProduct = {};
    this.items.forEach((dessert) => {
      totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;
    })

    const currentProductCount = totalCountPerProduct[product.id];
    const currentProductCountSpan = document.getElementById(`product-count-for-id${id}`);

    currentProductCount > 1 
      ? currentProductCountSpan.textContent = `${currentProductCount}x`
      : productsContainer.innerHTML += `
      <div id=dessert${id} class="product" ">
	   <img src="${img}"   >
        <p>
          <span class="product-count" id=product-count-for-id${id}></span>${category}
        </p>
		
        <p>${price}</p>
      </div>
      `;
  }

  getCounts() {
    return this.items.length;
  }

  clearCart() {
    if (!this.items.length) {
      alert("Your shopping cart is already empty");
      return;
    }

    const isCartCleared = confirm(
      "Are you sure you want to clear all items from your shopping cart?"
    );

    if (isCartCleared) {
      this.items = [];
      this.total = 0;
      productsContainer.innerHTML = "";
      totalNumberOfItems.textContent = 0;
      cartSubTotal.textContent = 0;
      cartTaxes.textContent = 0;
      cartTotal.textContent = 0;
    }
  }

  calculateTaxes(amount) {
    return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
  }

  calculateTotal() {
    const subTotal = this.items.reduce((total, item) => total + item.price, 0);
    const tax = this.calculateTaxes(subTotal);
    this.total = subTotal + tax;
    cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
    cartTaxes.textContent = `$${tax.toFixed(2)}`;
    cartTotal.textContent = `$${this.total.toFixed(2)}`;
    return this.total;
  }
};

const cart = new ShoppingCart();
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

[...addToCartBtns].forEach(
  (buttons) => {
    buttons.addEventListener("click", (event) => {
      cart.addItem(Number(event.target.id), products);
      totalNumberOfItems.textContent = cart.getCounts();
      cart.calculateTotal();
    })
  }
);

cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing;
 
  cartContainer.style.display = isCartShowing ? "block" : "none";
});

// var carts =[];


// function addToCart(){
//     document.querySelector(".buttons")
//     .addEventListener("click",function(){
//         alert("Hello");
//     }
//     )
// }
// addToCart();

