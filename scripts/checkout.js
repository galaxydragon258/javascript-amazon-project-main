import {renderOrderedItems} from "../data/checkout/ordersummar.js";
import {PaymentSummary}from "../data/checkout/PaymentSum.js";
import {renderChecout} from "../data/checkout/checkoutHader.js";
export {update} from "../data/cart.js";
import "../data/cart-class.js";




renderChecout();
renderOrderedItems();
PaymentSummary();