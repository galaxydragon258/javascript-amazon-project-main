import {cart,SavedLocalStorage,update} from "../data/cart.js"
import{products}from "../data/products.js"

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
            <select class= "js-quantity-${product.id}">
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

          <div class="added-to-cart added${product.id}">
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

let accumulator;
let quantity;
let ID;

document.querySelector('.js-product-grid').innerHTML = html;

document.querySelectorAll('.js-cart').
forEach((buttons)=>{
  buttons.addEventListener('click',()=>{
    let Product_Id = buttons.dataset.productId;
    let CartQuantity = 0;
    let matches;
    
    
    const QuantityElement = document.querySelector(`.js-quantity-${Product_Id}`);
    const Quantity_Selector = Number(QuantityElement.value);
    const ButtonMark = document.querySelector(`.added${Product_Id}`);
    

    cart.forEach((items)=>{
      if(Product_Id===items.ProductID){
        matches = items;
      }
    });

    if(matches){
      matches.Quantity+=1;
    
    }
    
    else{
      cart.push({
      ProductID:Product_Id,
      Quantity:1,
      DeliveryId:1
      
    });
    

 
  }
  
  
    cart.forEach((Item)=>{
      let quanti = Item.Quantity;
      CartQuantity += quanti;
    });

    
    console.log(Quantity_Selector);
    console.log(cart);  

    document.querySelector('.cart-quantity').innerHTML = CartQuantity;

 
    
    ButtonMark.classList.add('visible');
    
    refrehs();

     ID = setTimeout(()=>{
       ButtonMark.classList.remove('visible')
  
    },2000)

    function refrehs(){
      clearTimeout(ID);
      
    }
    update();
    SavedLocalStorage();
  
   
      


   
   
    });//end of event listener  
  
})

update();







