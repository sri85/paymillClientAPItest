var frisby = require('frisby');

// These tests are for testing paymill create API
var serverDetails = {
"url": "https://api.paymill.com/v2.1/clients/",
"firstEmail":"first@test.com",
"secondEmail":"second@test.com",


};

frisby.globalSetup({ 
  request: {
    headers: { 'Authorization': 'Basic ZjlmYjkzZTYwOWQ0ZDhlNmRiMDRiZmQ0MDBiYjM2MTU6Og==' }
  }
});

frisby.create("")
.post(serverDetails.url,{
            email:serverDetails.firstEmail,
            
      })
      .afterJSON(function(response){
//Step3: This is the step where we cleanup the data.
      frisby.create("")
      .delete(serverDetails.url+response.data.id)
      .toss()
      })
      .afterJSON(function(response){
 //STEP2: This is the step where we get the details of the client where which we had created in the previous state.
      frisby.create("Check whether get client details API returns a 200 when proper client details are passed ")
      .get(serverDetails.url+response.data.id)
      .expectStatus(404)
      .expectHeaderContains('content-type','application/json')
      
      .toss()
      })
      .toss()
      


frisby.create("")
.post(serverDetails.url,{
            email:serverDetails.secondEmail,
            
      })
      .afterJSON(function(response){
//Step3: This is the step where we cleanup the data.
      frisby.create("")
      .delete(serverDetails.url+response.data.id)
      .toss()
      })
      .afterJSON(function(response){
 //STEP2: This is the step where we get the details of the client where which we had created in the previous state.
      frisby.create("Check whether get client details API returns a 200 when proper client details are passed ")
      .delete(serverDetails.url+response.data.id)
      .expectStatus(404)
      .expectJSON({
    "exception": "client_not_found",
    "error": "Client not found"
    })
      
    .toss()
    })
    .toss()

frisby.create("")
.post(serverDetails.url,{
            email:serverDetails.firstEmail,
            
      })
      .afterJSON(function(response){
//Step3: This is the step where we cleanup the data.
      frisby.create("")
      .delete(serverDetails.url+response.data.id)
      .addHeader('Authorization', '')
      .expectStatus(401)
      .expectJSON({"error":"Access Denied","exception":"InvalidAuthentication"
      })
      .toss()
      })
      
    .toss()
 
 frisby.create("")
.post(serverDetails.url,{
            email:serverDetails.secondEmail,
            
      })
      .afterJSON(function(response){
//Step3: This is the step where we cleanup the data.
      frisby.create("")
      .delete(serverDetails.url)
      
      .expectStatus(412)
      .expectJSON({
    "error": {
        "messages": {
            "required": "Parameter is mandatory"
        },
        "field": "Identifier"
    }
})
      .toss()
      })
      
    .toss();
    
    
frisby.create("")
        .get("https://api.paymill.com/v2.1/clients/")
        
        .afterJSON(function(response){
        var x =response.data_count;
        console.log(x)
        for(var i =0;i<x;i++){
            frisby.create("")
                    
                  .delete(serverDetails.url+response.data[i].id)
        .toss()
        }
        }).toss();    



        
        
        
        
        



 
    
