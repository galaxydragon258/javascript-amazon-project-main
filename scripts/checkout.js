  import { cart, Delete,SavedLocalStorage,update, updateQuantity } from "../data/cart.js";
  import { products} from "../data/products.js";

  let hmtl = '';
  cart.forEach((cartItem)=>{
      const cartId = cartItem.ProductID;
      let matchingItem
    

      products.forEach((product)=>{
          if(product.id === cartId){{
              matchingItem = product

          }}
      })

    hmtl +=`
    <div class="cart-item-container js-container${matchingItem.id}">
              <div class="delivery-date">
                Delivery date: Tuesday, June 21
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingItem.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                  ${matchingItem.name}
                  </div>
                  <div class="product-price">
                    ${matchingItem.priceCents/100}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label quantityLabel${matchingItem.id}">${cartItem.Quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary updateLink"
                    data-product-id=${matchingItem.id}>
                      Update
                    </span>
                    <input class = " quantityInput quantityinput${matchingItem.id}">
                    <span class = "save-quantity  save "
                    data-saveId=${matchingItem.id}>Save</span>
                    <span class="delete-quantity-link link-primary delBut"
                    data-product-id="${matchingItem.id}">
                      Delete
                    </span> 
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  <div class="delivery-option">
                    <input type="radio" checked
                      class="delivery-option-input"
                      name="delivery-option-${matchingItem.id}">
                    <div>
                      <div class="delivery-option-date">
                        Tuesday, June 21
                      </div>
                      <div class="delivery-option-price">
                        FREE Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${matchingItem.id}">
                    <div>
                      <div class="delivery-option-date">
                        Wednesday, June 15
                      </div>
                      <div class="delivery-option-price">
                        $4.99 - Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${matchingItem.id}">
                    <div>
                      <div class="delivery-option-date">
                        Monday, June 13
                      </div>
                      <div class="delivery-option-price">
                        $9.99 - Shipping
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;

          

  })




  document.querySelector('.hi').innerHTML = hmtl;
  document.querySelectorAll('.delBut').
  forEach((DelButton)=>{
    DelButton.addEventListener('click',()=>{
      let DelbutId = DelButton.dataset.productId
      Delete(DelbutId);
      console.log(cart);
      let button = document.querySelector(`.js-container${DelbutId}`);
      button.remove();
      update();
      SavedLocalStorage();
      
      
    })
  });

  document.querySelectorAll('.updateLink').
  forEach((Update)=>{
    Update.addEventListener('click',()=>{
      let ProductId = Update.dataset.productId;
      const container = document.querySelector(`.js-container${ProductId}`);
      const up = document.querySelector('.updateLink');
      container.classList.add('editing');

      update();
      SavedLocalStorage();
    
      
    })
    


  })

document.querySelectorAll('.save').forEach((SaveBut) => {
  SaveBut.addEventListener('click', () => {
    const id = SaveBut.dataset.saveid;
    const container = document.querySelector(`.js-container${id}`);
    container.classList.remove('editing');

    const input = document.querySelector(`.quantityinput${id}`);
    const label = document.querySelector(`.quantityLabel${id}`);

    const totalQuanty = Number(input.value);

    const newQuantity = updateQuantity(id,totalQuanty);
    label.innerHTML = newQuantity.quantity;
    console.log(newQuantity.quantity);
    console.log(newQuantity.id);
   

    update(); 
    SavedLocalStorage();

    input.value = '';
  });
});




  update(); 

