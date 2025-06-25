
import { cart } from "../cart.js";
export function renderChecout(){

    let totalQuantity = 0;
    cart.forEach((items)=>{{
        totalQuantity += items.Quantity;
        



    }})

let headerHTML ="";

    headerHTML=`
      <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link test" 
            href="amazon.html">${totalQuantity} items</a>)
        </div>`;

        document.querySelector('.test').innerHTML = headerHTML;

}

export function amazonQuantiy(){
    let Qaunti = 0;
    cart.forEach((items)=>{
        Qaunti  += items.Quantity;
    })
        

    document.querySelector('.quanti').innerHTML = Qaunti;

} 



