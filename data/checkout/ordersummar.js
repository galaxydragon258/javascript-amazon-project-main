import { cart, Delete, SavedLocalStorage, updateQuantity, updateDeliveryTime, fun, DeliverIdMatcher } from "../cart.js";
import { DeliverOption, calculateDeliveryDate } from "../../scripts/DeliveryOptions.js";
import { PaymentSummary } from "./PaymentSum.js";
import { renderChecout } from "./checkoutHader.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export function renderOrderedItems() {
  let html = '';

  cart.forEach((cartItem) => {
    const cartId = cartItem.ProductID;
    const deliveryId = cartItem.DeliveryId;

    let matchingItem = fun(cartId);


    let deliveryDate = DeliverIdMatcher(deliveryId);
  

    let format = calculateDeliveryDate(deliveryDate);

    html += `
      <div class="cart-item-container js-container${matchingItem.id}">
        <div class="delivery-date">
          Delivery date: ${format}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingItem.image}">

          <div class="cart-item-details">
            <div class="product-name">${matchingItem.name}</div>
            <div class="product-price">${(matchingItem.priceCents / 100).toFixed(2)}</div>
            <div class="product-quantity">
              <span>Quantity: <span class="quantity-label quantityLabel${matchingItem.id}">${cartItem.Quantity}</span></span>
              <span class="update-quantity-link link-primary updateLink" data-product-id="${matchingItem.id}">Update</span>
              <input class="quantityInput quantityinput${matchingItem.id}">
              <span class="save-quantity save" data-saveId="${matchingItem.id}">Save</span>
              <span class="delete-quantity-link link-primary delBut" data-product-id="${matchingItem.id}">Delete</span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            ${DeliveryOp(matchingItem, deliveryId)}
          </div>
        </div>
      </div>
    `;
  });

  
  document.querySelector('.hi').innerHTML = html;

  
  document.querySelectorAll('.delBut').forEach((DelButton) => {
    DelButton.addEventListener('click', () => {
      let DelbutId = DelButton.dataset.productId;
      Delete(DelbutId);
      renderChecout();
      renderOrderedItems();
      PaymentSummary();
      SavedLocalStorage();
    });
  });

  
  document.querySelectorAll('.updateLink').forEach((Update) => {
    Update.addEventListener('click', () => {
      let ProductId = Update.dataset.productId;
      const container = document.querySelector(`.js-container${ProductId}`);
      container.classList.add('editing');
      PaymentSummary();
      SavedLocalStorage();
    });
  });

  
  document.querySelectorAll('.save').forEach((SaveBut) => {
    const id = SaveBut.dataset.saveid;
    const input = document.querySelector(`.quantityinput${id}`);
    const label = document.querySelector(`.quantityLabel${id}`);

    SaveBut.addEventListener('click', () => {
      const container = document.querySelector(`.js-container${id}`);
      container.classList.remove('editing');

      const totalQuantity = Number(input.value);

      const newQuantity = updateQuantity(id, totalQuantity);
      if (newQuantity) {
        label.innerHTML = newQuantity.quantity;
      }
      PaymentSummary();
      renderChecout();
      SavedLocalStorage();

      input.value = '';
    });

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        SaveBut.click();
      }
    });
  });

  
  document.querySelectorAll('.delivery-option.radioButtons').forEach((radio) => {
    const { productid, deliveryid } = radio.dataset;
    radio.addEventListener('click', () => {
      updateDeliveryTime(productid, deliveryid);
      PaymentSummary();
      renderOrderedItems();
    });
  });
}

function DeliveryOp(matchingItem, deliveryId) {
  let html = '';
  DeliverOption.forEach((options) => {
    let formatDate = calculateDeliveryDate(options);
    let pricing = options.priceCents === 0 ? "FREE Shipping" : `${(options.priceCents / 100).toFixed(2)} - Shipping`;
    let isChecked = options.id === deliveryId ? "checked" : "";

    html += `
      <div class="delivery-option radioButtons" data-productid="${matchingItem.id}" data-deliveryid="${options.id}">
        <input type="radio" ${isChecked} class="delivery-option-input" name="delivery-option-${matchingItem.id}">
        <div>
          <div class="delivery-option-date">${formatDate}</div>
          <div class="delivery-option-price">${pricing}</div>
        </div>
      </div>
    `;
  });
  return html;
}
