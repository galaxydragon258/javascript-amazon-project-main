import { cart, fun, DeliverIdMatcher, SavedLocalStorage} from "../cart.js";
import { Dollors } from "../../scripts/moenyConverte.js";


 let Responsse = JSON.parse(localStorage.getItem('order')) || [];




export function PaymentSummary() {
  let totalPriceQuantity = 0;
  let totalShipping = 0;
  let PriceBeforeTax = 0;
  let estimatedTax = 0;
  let Quantity = 0;

  cart.forEach((items) => {
    const cartId = items.ProductID;
    const deliveryId = items.DeliveryId;

    const matchingItem = fun(cartId);
    

    totalPriceQuantity += matchingItem.priceCents * items.Quantity;

    let Delivery = DeliverIdMatcher(deliveryId);
  
    totalShipping += Delivery.priceCents;

    PriceBeforeTax = totalPriceQuantity + totalShipping;
    estimatedTax = PriceBeforeTax * 0.10;
    Quantity += items.Quantity;
  });

  const total = totalPriceQuantity + totalShipping + estimatedTax;

  const html = `
    <div class="payment-summary-title">Order Summary</div>

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

    <button class="place-order-button button-primary e">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment').innerHTML = html;

  document.querySelector('.e').addEventListener('click', async (event) => {
  
     let transformedCart = cart.map(item => ({
      productId: item.ProductID,
      quantity: item.Quantity,
      deliveryOptionId: item.DeliveryId
    }));

    
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: transformedCart })
      });

      const order = await response.json();
      console.log('Order response:', order);

        if (!Array.isArray(Responsse)) {
        Responsse = Responsse ? [Responsse] : [];
      }

      Responsse.push(order); 

      localStorage.setItem('order', JSON.stringify(Responsse));
      let element = document.querySelector('.hi');

      element.remove();
      localStorage.removeItem('Cart');
      
     

     
      

     window.location.href = "orders.html"

  
    
  
});



}

  