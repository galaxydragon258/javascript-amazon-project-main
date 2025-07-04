
/*
const xhr  = new XMLHttpRequest();


xhr.addEventListener('load',()=>{
    

    console.log(xhr.response)

});

xhr.open('GET','https://supersimplebackend.dev/greeting'),
xhr.send();





async function marga() {
    const promise = await fetch('https://supersimplebackend.dev/greeting',{
        method: 'GET',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            name:'Mark Justine'
        })
        

    })

    let name = await promise.text();

    console.log(name)
        
    
}
async function marga() {
    try{
    const promise = await fetch('https://amazon.com').then((Response)=>{
        return Response.text();
    })    

    console.log(promise);
}

catch(error){
    console.log('error')
}
}

marga();



*/



async function fun() {
  
    const promise = await fetch('https://supersimplebackend.dev',{
        method: 'POST',
    
    })

    console.log(promise);

    if(promise.status >= 400){
        console.log(promise);   
    }

}
fun();