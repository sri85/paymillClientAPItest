var frisby = require('frisby');

// These tests are for testing paymill remove Client https://developers.paymill.com/en/reference/api-reference/index.html#remove-client
var serverDetails = {
"url": "https://api.paymill.com/v2.1/clients/",
"firstEmail":"first@test.com",
"secondEmail":"second@test.com",

};
//Global setup which will be used for all the requests
frisby.globalSetup({ 
  request: {
    headers: { 'Authorization': 'Basic ZjlmYjkzZTYwOWQ0ZDhlNmRiMDRiZmQ0MDBiYjM2MTU6Og==' }
  }
});

//Setting up test data
frisby.create("Setting up the test data")
.post(serverDetails.url,{
            email:serverDetails.firstEmail,
            
      })
      .afterJSON(function(response){
//Step2: This is the step where we cleanup the data.
      frisby.create("")
      
      .delete(serverDetails.url+response.data.id)
      .toss()
      })
      .afterJSON(function(response){
   
 //STEP3: This is the step where we get the details of the client where which we had created in the previous state.
      frisby.create("Check whether the client has been deleted  properly by checking it returns a 404 error after deletion ")
      .get(serverDetails.url+response.data.id)
      .expectStatus(404)
      .expectHeaderContains('content-type','application/json')
      
      .toss()
      }).toss();
//Create test data
frisby.create("Create Test Data")
.post(serverDetails.url,{
            email:serverDetails.secondEmail,
            
      })
      .afterJSON(function(response){
//Step2: This is the step where we cleanup the data.
      frisby.create("Delete the data")
      .delete(serverDetails.url+response.data.id)
      .toss()
      })
      .afterJSON(function(response){
 //STEP2: This is the step where we get the details of the client where which we had created in the previous state.
      frisby.create("Check the message returned by the API when passing a non existent id to the delete API")
      .delete(serverDetails.url+response.data.id)
      .expectStatus(404)
      .expectJSON({
    "exception": "client_not_found",
    "error": "Client not found"
    })
      
    .toss()
    }).toss();
    

frisby.create("Create test data")
.post(serverDetails.url,{
            email:serverDetails.firstEmail,
            
      })
      .afterJSON(function(response){
//Step3: This is the step where we cleanup the data.
      frisby.create("Chec whether the API returns 401 error when the delete API is called without authorization headers")
      .delete(serverDetails.url+response.data.id)
      .addHeader('Authorization', '')
      .expectStatus(401)
      .expectJSON({"error":"Access Denied","exception":"InvalidAuthentication"
      })
      .toss()
      }).toss();
      
    
 
 frisby.create("Create test data for the test")
.post(serverDetails.url,{
            email:serverDetails.secondEmail,
            
      })
      .afterJSON(function(response){
//Step3: This is the step where we cleanup the data.
      frisby.create("Check whether the API returns 412 error when delete API is called without passing the mandatory attribute(i.e client ID)")
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
      }).toss();
      
    
    
//Helper test to clean up all the remaining test data    
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



        
        
        
        
        



 
    
