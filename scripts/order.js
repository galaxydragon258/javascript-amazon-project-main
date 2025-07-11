import { productss } from "../data/product-backend.js";
import { Dollors } from "./moenyConverte.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {calculateDeliveryDate} from "../../scripts/DeliveryOptions.js";
import { products } from "../data/products.js";

        

        const allOrders = JSON.parse(localStorage.getItem('order')) || [];


        let html = '';
        let order = [];
        export let quantitys = 0;


        allOrders.forEach((orderItems)=>{
            console.log(orderItems);
            let productId = [];// id galing orderItem
            let estimated =  [];
            let macher = [];
            let format = [];    

           
            
            orderItems.products.forEach((product)=>{// getting id
            productId.push({
                    id: product.productId,
                    quantity:product.quantity,
                    delivery:product.estimatedDeliveryTime,
                    productId:product.productId,
                    order:orderItems.id
                    

            });
            quantitys += product.quantity;

            estimated.push(
                product.estimatedDeliveryTime
            );

            
            })//end

            let placorder = dayjs(orderItems.orderTime).format('MMMM D')
            console.log(placorder)


    


        console.log(macher);
        document.querySelector('.quanti').innerHTML = quantitys;


        productss.forEach((products)=>{// if match id get propert of the object
            productId.forEach((id)=>{
                let added = dayjs(id.delivery);
                const formatted= dayjs(id.delivery).format('dddd');
                if(formatted === 'Saturday'){
                added = added.add(2,'days'); 
            }
                else if (formatted === 'Sunday'){
                added= added.add(1,'days');
                }
                const format = added.format('MMMM D');
                if(products.id === id.id){
                    macher.push({
                        image:products.image,
                        name:products.name,
                        quantity:id.quantity,
                        delivery:format,
                        id:products.id,
                        productId:id.productId,
                        order:id.order
                    })
                
                }
    
        })/// end



    });/// end



    console.log(macher);




        
    html += `
     <div class="order-container">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${placorder}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>${Dollors(orderItems.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderItems.id}</div>
            </div>
          </div>
            ${orderDetails(macher)}

        </div>
    
    `;




    
    })

    
    document.querySelector('.testing').innerHTML = html;
    

    function orderDetails(match){

        let html = ""

            match.forEach((items)=>{

                 html += `
                <div class="order-details-grid">
                    <div class="product-image-container">
                    <img src="${items.image}">
                    </div>  

                    <div class="product-details">
                    <div class="product-name">
                        ${items.name}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: ${items.delivery}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${items.quantity}
                    </div>
                    <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                    </div>

                    <div class="product-actions">
                    <a href="tracking.html?ProductId=${items.productId}$OrderId=${items.order}">
                        <button class="track-package-button button-secondary">
                        Track package
                        </button>
                    </a>
                    </div>
                </div>`;

            });

           

               
          return html

    }
    
    
