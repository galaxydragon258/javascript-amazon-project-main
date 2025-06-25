    import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

    export let DeliverOption =[{

        id:'1',
        date:7,
        priceCents:0,


    },{

        
        id:'2',
        date:3,
        priceCents:499,


    },{


        
        id:'3',
        date:1,
        priceCents:999,


    }];



    export function calculateDeliveryDate(deliveryDate){
        
            let today = dayjs();

            let added = today.add(deliveryDate.date , "days");

            let format = added.format('dddd');

            if(format === 'Saturday'){
                added = added.add(2,'days');
            }
            
            return added.format("dddd,MMMM D");
            


        

            

    }

