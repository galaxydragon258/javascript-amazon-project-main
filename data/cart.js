import { products } from "../data/products.js";
import { DeliverOption } from "../scripts/DeliveryOptions.js";



export let cart = JSON.parse(localStorage.getItem('Cart'))|| [];



    
 




export function Delete(CARTID) {
  let newCART = [];
  cart.forEach((cartItems) => {
    if (cartItems.ProductID !== CARTID) {
      newCART.push(cartItems);
    }
  });
  cart = newCART;
  SavedLocalStorage();
}

export function SavedLocalStorage() {
  localStorage.setItem('Cart', JSON.stringify(cart));
}


export function updateQuantity(productId, addedQuantity) {
  for (let item of cart) {
    if (item.ProductID === productId) {
      item.Quantity += addedQuantity;
      SavedLocalStorage();
      return {
        id: item.ProductID,
        quantity: item.Quantity,
      }
    }
  }
  console.warn(`updateQuantity: productId ${productId} not found in cart`);
  return null;
}

export function updateDeliveryTime(ProductId, DeliveryId) {
  let matching;
  cart.forEach((items) => {
    if (items.ProductID === ProductId) {
      matching = items;
    }
  });
  if (matching) {
    matching.DeliveryId = DeliveryId;
    SavedLocalStorage();
  } else {
    console.warn(`updateDeliveryTime: ProductId ${ProductId} not found in cart`);
  }
}

export function fun(cartId) {

  let matchingItem = null;
  products.forEach((product) => {
    if (product.id === cartId) {
      matchingItem = product;
    }
  });

  return matchingItem;
}

export function DeliverIdMatcher(deliveryId) {
  let deliveryDate = null;
  DeliverOption.forEach((options) => {
    if (deliveryId === options.id) {
      deliveryDate = options;
    }
  });
  return deliveryDate;
}
