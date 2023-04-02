var divTag=document.createElement("div")
divTag.setAttribute("class","container-fluid")
document.body.append(divTag)
divTag.innerHTML=` 
<h1>Here You Can Know The Nationality Of The Name</h1><br>
<nav class="navbar ">
<form class="d-flex" role="search">
<input type="text" class="form-control me-2" id="searchtext" placeholder="Enter the name" >
<input type="button" value="Search" id="btn" class="btn btn-outline-success">
<input type="button" value="Reset" id="resetbtn" class="btn btn-outline-danger">
</form>
</nav><br>`
var resultDiv=document.createElement("div")
resultDiv.setAttribute("class","container-fluid result")
document.body.append(resultDiv)
resultDiv.innerHTML=`<h4 id=result></h4><br>`
// document.body.innerHTML='hi'

let search_text=document.querySelector("#searchtext");
let result_data=document.querySelector("#result");
let search_btn=document.querySelector("#btn");
 let reset_btn=document.querySelector("#resetbtn");

search_btn.addEventListener("click", async ()=>{
    let value=document.getElementById("searchtext").value;
    document.querySelector('.result').style.display="block"
    
    if(value.length==0||value.includes(" ")){
         alert("Please enter the valid name without any spaces");
}
    else {
      
        try{
            let data=await fetch(`https://api.nationalize.io/?name=${value}`);
           let result= await data.json();
           console.log(result);
           result_data.innerHTML="";
           
           for(let i=0;i<2;i++){
          result_data.innerHTML+=
             `
             <div class="container">
               <div class="card">
                 <div class="card-header">
                  <div class="card-title">TOP-${i+1}</div>
                  
                 </div>
                 <div class="card-body">
                 Country_id:${result.country[i].country_id}<br>
                 Probability :${result.country[i].probability}<br><br>
                 </div>
               </div>
             </div>
               `
           }
           
        }
        catch{
            console.log(error);
        }
        
    }
});

var container_data = document.querySelector('.card');
reset_btn.addEventListener("click",()=>{
document.querySelector('.result').style.display="none";
search_text.value="";
result_data.innerHTML=" ";

});
