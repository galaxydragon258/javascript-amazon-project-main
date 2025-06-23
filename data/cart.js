import { products} from "../data/products.js";
import { DeliverOption } from "../scripts/DeliveryOptions.js";


export let cart =  JSON.parse(localStorage.getItem('Cart'))

if(!cart){
    cart =
[{
    ProductID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    Quantity:1,
    DeliveryId:'1'
},
{

    ProductID: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    Quantity:1,
    DeliveryId:'2'

}
];


};

export function testing(){
    cart.forEach((testing)=>{
    const id = testing.Quantity;
    console.log(id);
    })
}


export function Delete(CARTID){
    let newCART = [];
    cart.forEach((cartItems)=>{
        if(cartItems.ProductID !== CARTID){
            newCART.push(cartItems);

        }
    })
    cart = newCART;
    SavedLocalStorage();

}


export function SavedLocalStorage(){
    localStorage.setItem('Cart',JSON.stringify(cart));
}




export function update(){

let TotalCart = 0
update.TotalCart = TotalCart;
cart.forEach((Items)=>{
TotalCart += Items.Quantity;
});
let Quanti =`${TotalCart}`;
let i = document.querySelector('.test').innerHTML = Quanti


}

export function updateQuantity(productId, addedQuantity) {
 
    for(let item of cart){
        if(item.ProductID === productId){
            item.Quantity += addedQuantity;
            SavedLocalStorage();
            return {
                id:item.ProductID,
                quantity:item.Quantity,
                
            }
            
        }
    }
}

export function updateDeliveryTime(ProductId,DeliveryId){
    let matching;
    cart.forEach((items)=>{
        if(items.ProductID === ProductId){
            matching = items;

        }

    });
    matching.DeliveryId = DeliveryId;
  SavedLocalStorage();

}


export function fun(cartId){
    let matchingItem
    products.forEach((product)=>{
        if(product.id === cartId){{
            matchingItem = product;
            

        }}
    })

    return matchingItem;

};

export function DeliverIdMatcher(deiveryId){
    let deliveryDate;

    DeliverOption.forEach((options)=>{
        if(deiveryId === options.id){
            deliveryDate = options;
            console.log('working')
        }
        })
        return deliveryDate;

}


