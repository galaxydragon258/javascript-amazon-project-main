import { Dollors } from "../scripts/moenyConverte.js";
import { products } from "./products.js";
import { renderGrid } from "../scripts/amazon.js";



export let  productss =  JSON.parse(localStorage.getItem('products'));

export function loadFetch(fun){
  console.log('function loaded')
  const promise = fetch('https://supersimplebackend.dev/products').then((response)=>{
    return response.json();
  }).
  then((ProductData)=>{
    console.log('got the data')

    productss = ProductData.map((ProductDetails)=>{
      if(ProductDetails.type==='Appliances'){
            return new Appliances(ProductDetails)
        }
        if(ProductDetails.type ==='clothing' ){
            return new Clothes(ProductDetails)

        }
        
            return new Product(ProductDetails);

      
    })

    localStorage.setItem('products',JSON.stringify(productss));
  })


  
  return promise;
    
}
loadFetch().then(()=>{
  renderGrid();
})








let xrl = new XMLHttpRequest;





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

