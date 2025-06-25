import {cart,fun,DeliverIdMatcher} from "../cart.js"
import { Dollors } from "../../scripts/moenyConverte.js";
 import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
export function PaymentSummary(){
    let matchingItem
    let totalPriceQuantity = 0;
    let  totalShipping = 0;
    let PriceBeforeTax = 0;
    let estimatedTax =0;
    let html = "";
    let total = totalPriceQuantity +totalShipping + estimatedTax;
    let Quantity =0;
    

  cart.forEach((items)=>{
    const cartId = items.ProductID;
    const deliveryId = items.DeliveryId
    
    
    matchingItem =fun(cartId);
    totalPriceQuantity += matchingItem.priceCents * items.Quantity;

    let Delivery = DeliverIdMatcher(deliveryId);    
    totalShipping += Delivery.priceCents;

    PriceBeforeTax = totalPriceQuantity+totalShipping;

    estimatedTax = PriceBeforeTax * 0.10;
    total = totalPriceQuantity +totalShipping + estimatedTax;
    Quantity += items.Quantity;
    
    
  });

  html += `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${Quantity}):</div>
            <div class="payment-summary-money">$${Dollors(totalPriceQuantity)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${Dollors(totalShipping)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${Dollors(PriceBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${Dollors(estimatedTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${Dollors(total)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `
  document.querySelector('.js-payment').innerHTML = html;
 
  
  
}

