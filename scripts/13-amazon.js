import { SavedLocalStorage,cart } from "../data/cart.js";


let html = '';


products.forEach((product)=>{
     let accum = `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${(product.priceCents /100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class = "mySelector">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-cart"
          data-product-id ="${product.id}">
            Add to Cart
          </button>
        </div>`;

        html += accum;
});



document.querySelector('.js-product-grid').innerHTML = html;

document.querySelectorAll('.js-cart').
forEach((buttons)=>{
  buttons.addEventListener('click',()=>{
    console.log(buttons.dataset.productName);
    let Product_Id = buttons.dataset.productId;
    let CartQuantity = 0;
    let matches;

    cart.forEach((items)=>{
      if(Product_Id===items.ProductID){
        matches =items;
      }
    });

    if(matches){
      matches.Quantity+=1;
    
      

    }
    
    else{
      cart.push({
      ProductID:Product_Id,
      Quantity:1,
      DeliveryId:'1'
      
    });
 
  }
  console.log('hi');

  console.log(matches.DeliveryId);
  
  
    cart.forEach((Item)=>{
      let quanti = Item.Quantity;
      CartQuantity += quanti;
 
    });
    
    console.log(cart);  
    document.querySelector('.cart-quantity').innerHTML = CartQuantity;
    SavedLocalStorage();
   
  });
  
  
})

 







