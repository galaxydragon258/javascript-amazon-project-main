export let cart = [{
    ProductID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    Quantity:2
,},{

    ProductID: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    Quantity:2

}
];

export function Delete(CARTID){
    let newCART = [];
    cart.forEach((cartItems)=>{
        if(cartItems.ProductID !== CARTID){
            newCART.push(cartItems);

        }
    })
    cart = newCART;
 

}


