import {renderOrderedItems} from "../data/checkout/ordersummar.js";
import {PaymentSummary}from "../data/checkout/PaymentSum.js";
import {renderChecout} from "../data/checkout/checkoutHader.js";
export {update} from "../data/cart.js";
import { loadBackend } from "../data/product-backend.js";

new Promise((resolve)=>{
    loadBackend(()=>{
        resolve();
    })

}).then(()=>{
    console.log('checkoutBackendLoaded');
    renderChecout();
    renderOrderedItems();
    PaymentSummary();

})



