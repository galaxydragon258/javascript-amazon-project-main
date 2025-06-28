import { renderGrid } from "../scripts/amazon.js";
import { Dollors } from "../scripts/moenyConverte.js";

export let  productss = [];



let xrl = new XMLHttpRequest;

 

xrl.addEventListener('load',()=>{
    productss = JSON.parse(xrl.response).
            map((ProductDetails)=>{
        if(ProductDetails.type==='Appliances'){
            return new Appliances(ProductDetails)
        }
        if(ProductDetails.type ==='clothing' ){
            return new Clothes(ProductDetails)

        }
        
            return new Product(ProductDetails);

        });
    

    console.log('loaded from backend')
      renderGrid();



  
        

    
})





xrl.open('GET', 'https://supersimplebackend.dev/products')
xrl.send();



  class Product{  
    id;
    image;
    name;
    rating;
    priceCents;

    constructor(ProductDetails){
      this.id = ProductDetails.id;
      this.image = ProductDetails.image;
      this.name = ProductDetails.name;
      this.rating = ProductDetails.rating;
      this.priceCents = ProductDetails.priceCents;  

      
    }

     getUrl(){
      return `images/ratings/rating-${this.rating.stars*10}.png`
     }
     getPriceCalcu(){

      return `$${Dollors(this.priceCents)}`

      
     }
     getWarrant(){
      return '';

    }
    getInstruct(){
    return ''
  }

  
    getsize(){
      return ''

    }

    
  }

  class Appliances extends Product{
    instruction;
    warrant;

    constructor(ProductDetails){
      super(ProductDetails);
      this.instruction = ProductDetails.appliancesInstruction;
      this.warrant = ProductDetails.appliancesWarranty
      
    }

    getWarrant(){
      return `<a href = "${this.warrant}" target="_blank">Warrant</a>`

    }

    getInstruct(){
      return `<a href = "${this.instruction}" target="_blank">Instruction</a>`

    
  }

  }

  class Clothes extends Product{
    size;

    constructor(ProductDetails){
      super(ProductDetails)
      this.size = ProductDetails.sizeChartLink;
    }

    getsize(){
      return `<a href = "${this.size}" target="_blank">Size Chart</a>`

    }

  }

