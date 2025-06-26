
    class Cart{
      cartItems;
  
      StorageName;

        constructor(StorageName){
            this.StorageName = StorageName;
            this.LoadLocal();
            console.log('class-testing');
            console.log(this.cartItems);

        }




        
        LoadLocal(){
        this.cartItems =  JSON.parse(localStorage.getItem(this.StorageName));
            
        
        if(!this.cartItems){
        this.cartItems = [{
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
        };


        testing(){
        this.cartItems.forEach((testing)=>{
        const id = testing.Quantity;
        console.log(id);
        })
         };





        
        Delete(CARTID){
        let newCART = [];
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.ProductID !== CARTID){
                newCART.push(cartItem);

            }
        })
        this.cartItems = newCART;
        this.SavedLocalStorage();

    }   


        SavedLocalStorage(){
        localStorage.setItem(this.StorageName,JSON.stringify(this.cartItems));
    }


        
        updateQuantity(productId, addedQuantity) {
        
            for(let item of this.cartItems){
                if(item.ProductID === productId){
                    item.Quantity += addedQuantity;
                    this.SavedLocalStorage();
                    return {
                        id:item.ProductID,
                        quantity:item.Quantity,
                        
                    }
                    
                }
            }
        }


        
    updateDeliveryTime(ProductId,DeliveryId){
        let matching;
        this.cartItems.forEach((items)=>{
            if(items.ProductID === ProductId){
                matching = items;

            }

        });
        matching.DeliveryId = DeliveryId;
        this.SavedLocalStorage();

    }



    fun(cartId){
        let matchingItem
        this.cartItems.forEach((product)=>{
            if(product.id === cartId){{
                matchingItem = product;
                

            }}
        })

        return matchingItem;

    }

    DeliverIdMatcher(deiveryId){
        let deliveryDate;

        DeliverOption.forEach((options)=>{
            if(deiveryId === options.id){
                deliveryDate = options;
            }
            })
            return deliveryDate;

    } 


    addtoCart(ProductId){
        let matching;
        this.cartItems.forEach((items)=>{
            if(items.ProductID === ProductId){
                matching = items;
            }
           
        })

     if(matching){
        matching.Quantity = matching.Quantity +1;

        }
        else{
        this.cartItems.push({
        ProductID:ProductId,
        Quantity:1,
        DeliveryId:'1'
        })
            }
        this.SavedLocalStorage();

        

    }    

    }



    function Carts(StorageName){

        const cart = {
        cartItems: undefined,


    

    }
    

    
        
};

const cart = new Cart('Mark');
cart.addtoCart('901eb2ca-386d-432e-82f0-6fb1ee7bf969');



   




    





