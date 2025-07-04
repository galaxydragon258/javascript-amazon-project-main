import {renderOrderedItems} from "../data/checkout/ordersummar.js";
import {PaymentSummary}from "../data/checkout/PaymentSum.js";
import {renderChecout} from "../data/checkout/checkoutHader.js";
import { loadFetch} from "../data/product-backend.js";


loadFetch().then(()=>{
    console.log('checkoutBackendLoaded');
    renderChecout();
    renderOrderedItems();
    PaymentSummary();

})




