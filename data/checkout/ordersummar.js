  import { cart, Delete,SavedLocalStorage,update, updateQuantity,updateDeliveryTime,fun,DeliverIdMatcher} from "../cart.js";
  import { products} from "../products.js";
  import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
  import { DeliverOption } from "../../scripts/DeliveryOptions.js";
  import {PaymentSummary} from "./PaymentSum.js";
 


  export function renderOrderedItems(){
  let hmtl = '';
  cart.forEach((cartItem)=>{
      const cartId = cartItem.ProductID;
      const deiveryId = cartItem.DeliveryId;
      

      let matchingItem = fun(cartId)

     let deliveryDate = DeliverIdMatcher(deiveryId);

      let today = dayjs();
      let added= today.add(deliveryDate.date , "days");
      let format = added.format("dddd, MMMM D")
      
      




    hmtl +=`
    <div class="cart-item-container js-container${matchingItem.id}">
              <div class="delivery-date">
                Delivery date: ${format}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingItem.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                  ${matchingItem.name}
                  </div>
                  <div class="product-price">
                    ${(matchingItem.priceCents/100).toFixed(2)}
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
                  
                 ${DeliveryOp(matchingItem,deiveryId)}  
                
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
      let input = document.querySelector(`.quantityinput${DelbutId}`)
      button.remove();
      update()
      PaymentSummary();;
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
      PaymentSummary();
      SavedLocalStorage();
    
      
    })
    


  })

document.querySelectorAll('.save').forEach((SaveBut) => {
    const id = SaveBut.dataset.saveid
    const input = document.querySelector(`.quantityinput${id}`);
    const label = document.querySelector(`.quantityLabel${id}`);

  SaveBut.addEventListener('click', () => {
    const id = SaveBut.dataset.saveid;
    const container = document.querySelector(`.js-container${id}`);
    container.classList.remove('editing');

    
    const totalQuanty = Number(input.value);

    const newQuantity = updateQuantity(id,totalQuanty);
    label.innerHTML = newQuantity.quantity;
    console.log(newQuantity.quantity);
    console.log(newQuantity.id);
     PaymentSummary();
    update(); 
    SavedLocalStorage();

    input.value = '';
  });

    input.addEventListener('keydown',(event)=>{
    if(event.key === 'Enter'){
      SaveBut.click();
      PaymentSummary();
      
    }
  });
  
});


  function DeliveryOp(matchingItem,deiveryId){
      let html = '';
      let days = dayjs();

    
      DeliverOption.forEach((options)=>{

        let Aded = days.add(options.date, 'days');
        let formatDate = Aded.format("dddd, MMMM D");
        

        let Pricing  = options.priceCents === 0?
        "FREE Shipping":`${options.priceCents/100} - Shipping`;

        let isChecked = options.id === deiveryId ? "checked":"";
        
        
      

    html += `
              <div class="delivery-option radioButtons"
              data-productid = "${matchingItem.id}"
              data-deliveryid = "${options.id}"
              >
              <input type="radio" 
                ${isChecked}
                class="delivery-option-input"
                name="delivery-option-${matchingItem.id}">
              <div>
                <div class="delivery-option-date">
                  ${formatDate}
                </div>
                <div class="delivery-option-price">
                   ${Pricing}
                </div>
              </div>
            </div>`;
    });
    return html;


  }

  document.querySelectorAll('.radioButtons').
  forEach((radio)=>{
    const {productid,deliveryid} = radio.dataset;
    radio.addEventListener('click',()=>{
      updateDeliveryTime(productid,deliveryid);
      PaymentSummary();
      renderOrderedItems();
      
      
    })
    

    
  })
update(); 

  
  }
  renderOrderedItems();
