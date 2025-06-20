export let cart =  JSON.parse(localStorage.getItem('Cart'))

if(!cart){
    cart =
[{
    ProductID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    Quantity:0
},{

    ProductID: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    Quantity:2

}
];

}
SavedLocalStorage();

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
                quantity:item.Quantity
            }
            
        }
    }
}


